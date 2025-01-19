package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Ticket;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class TicketJsonHandler implements DataPersistence<Ticket> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final S3Client s3Client;
    private final String bucketName = "my-backend-storage-bucket-1234"; // Replace with your bucket name
    private final String key = "tickets.json"; // Path to the file in the bucket

    public TicketJsonHandler() {
        // Initialize the S3 client
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Replace with your AWS region
                .credentialsProvider(software.amazon.awssdk.auth.credentials.AnonymousCredentialsProvider.create())
                .build();
    }

    @Override
    public List<Ticket> readAll() {
        try {
            // Download the file from S3
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            InputStream inputStream = s3Client.getObject(getObjectRequest);

            // Parse the JSON file into a list of Tickets
            return List.of(objectMapper.readValue(inputStream, Ticket[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Ticket> tickets) {
        try {
            // Convert the list to JSON
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            String jsonContent = objectMapper.writeValueAsString(tickets);

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