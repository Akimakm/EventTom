# Use a base image with JDK 20
FROM openjdk:20-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY eventtom-0.0.1-SNAPSHOT.jar eventtom.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "eventtom.jar"]
