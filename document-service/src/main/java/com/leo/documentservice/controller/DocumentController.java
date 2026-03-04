package com.leo.documentservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/upload")
    public ResponseEntity<byte[]> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        String content = new String(file.getBytes());

        ResponseEntity<byte[]> response = restTemplate.postForEntity(
                "http://PDF-SERVICE/pdf/convert",
                content,
                byte[].class
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=converted.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(response.getBody());
    }
}