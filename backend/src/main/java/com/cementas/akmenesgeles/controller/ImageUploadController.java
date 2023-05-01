package com.cementas.akmenesgeles.controller;

import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RestController
public class ImageUploadController {

    private static final String BUCKET_NAME = "images";

    @Autowired
    private MinioClient minioClient;

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Check if the bucket exists, if not, create it
            if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(BUCKET_NAME).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(BUCKET_NAME).build());
            }

            // Generate a unique file name for the uploaded image
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

            // Upload the file to the MinIO bucket
            try (InputStream inputStream = file.getInputStream()) {
                minioClient.putObject(PutObjectArgs.builder()
                        .bucket(BUCKET_NAME)
                        .object(fileName)
                        .stream(inputStream, file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build());
            }

            // Generate a pre-signed URL for the uploaded image
            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .bucket(BUCKET_NAME)
                    .object(fileName)
                    .build());

            // Return the pre-signed URL of the uploaded image
            return new ResponseEntity<>(url, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload the file to MinIO bucket\n", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
