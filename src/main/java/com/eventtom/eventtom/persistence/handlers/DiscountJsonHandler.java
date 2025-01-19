package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Discount;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DiscountJsonHandler implements DataPersistence<Discount> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final S3Client s3Client;
    private final String bucketName = "my-backend-storage-bucket-1234"; // Replace with your bucket name
    private final String key = "discounts.json"; // Path to the file in the bucket

    public DiscountJsonHandler() {
        // Initialize the S3 client
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Replace with your AWS region
                .build();
    }

    @Override
    public List<Discount> readAll() {
        try {
            // Download the file from S3
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            InputStream inputStream = s3Client.getObject(getObjectRequest);

            // Parse the JSON file into a list of Discounts
            return List.of(objectMapper.readValue(inputStream, Discount[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Discount> discounts) {
        try {
            // Convert the list to JSON
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            String jsonContent = objectMapper.writeValueAsString(discounts);

            // Upload the JSON content to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromString(jsonContent));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
