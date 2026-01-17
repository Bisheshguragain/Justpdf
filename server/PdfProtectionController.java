package com.justpdf.server.controller;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "*") // Configure appropriately for production
public class PdfProtectionController {

    @PostMapping("/protect")
    public ResponseEntity<byte[]> protectPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        if (password == null || password.trim().length() < 6) {
            return ResponseEntity.badRequest().build();
        }

        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            
            // Create access permissions
            AccessPermission accessPermission = new AccessPermission();
            accessPermission.setCanPrint(true);
            accessPermission.setCanModify(false);
            accessPermission.setCanExtractContent(false);
            accessPermission.setCanModifyAnnotations(false);
            accessPermission.setCanFillInForm(true);
            accessPermission.setCanExtractForAccessibility(true);
            accessPermission.setCanAssembleDocument(false);
            // accessPermission.setCanPrintDegraded(true); // Deprecated in PDFBox 2.x - modern PDF viewers ignore this permission

            // Create protection policy with AES-256 encryption
            StandardProtectionPolicy protectionPolicy = new StandardProtectionPolicy(
                    password,  // Owner password (for full access)
                    password,  // User password (to open the document)
                    accessPermission
            );
            
            // Set encryption key length to 256-bit AES
            protectionPolicy.setEncryptionKeyLength(256);
            protectionPolicy.setPermissions(accessPermission);

            // Apply protection
            document.protect(protectionPolicy);

            // Save to byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            byte[] pdfBytes = outputStream.toByteArray();

            // Prepare response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", 
                    file.getOriginalFilename().replace(".pdf", "_protected.pdf"));
            headers.setContentLength(pdfBytes.length);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("PDF Protection Service is running");
    }
}
