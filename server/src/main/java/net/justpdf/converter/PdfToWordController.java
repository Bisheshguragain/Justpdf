package net.justpdf.converter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for PDF to Word conversion
 * Handles file upload, validation, conversion, and download
 */
@RestController
@RequestMapping("/api/convert")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PdfToWordController {

    private final PdfToWordService pdfToWordService;

    public PdfToWordController(PdfToWordService pdfToWordService) {
        this.pdfToWordService = pdfToWordService;
    }

    /**
     * Convert PDF to Word endpoint
     * @param file PDF file uploaded by user
     * @return DOCX file as binary response
     */
    @PostMapping(value = "/pdf-to-word", 
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                 produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> convertPdfToWord(@RequestParam("file") MultipartFile file) {
        
        try {
            // Validate file
            ValidationResult validation = validateFile(file);
            if (!validation.isValid()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse(validation.getError()));
            }

            // Get original filename
            String originalFilename = file.getOriginalFilename();
            String outputFilename = sanitizeFilename(originalFilename)
                .replace(".pdf", ".docx");

            // Convert PDF to Word
            byte[] pdfBytes = file.getBytes();
            ByteArrayOutputStream docxOutput = pdfToWordService.convertPdfToWord(pdfBytes);

            // Return DOCX file
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", outputFilename);
            headers.setContentLength(docxOutput.size());

            return new ResponseEntity<>(docxOutput.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Conversion failed: " + e.getMessage()));
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "ok");
        response.put("service", "pdf-to-word-converter");
        return ResponseEntity.ok(response);
    }

    /**
     * Validate uploaded file
     */
    private ValidationResult validateFile(MultipartFile file) {
        // Check if file is empty
        if (file == null || file.isEmpty()) {
            return ValidationResult.error("No file uploaded");
        }

        // Check file size (max 50MB)
        long maxSize = 50 * 1024 * 1024; // 50MB
        if (file.getSize() > maxSize) {
            return ValidationResult.error("File too large. Maximum size is 50MB");
        }

        // Check file extension
        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".pdf")) {
            return ValidationResult.error("Invalid file type. Only PDF files are allowed");
        }

        // Check MIME type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return ValidationResult.error("Invalid file type. Only PDF files are allowed");
        }

        return ValidationResult.success();
    }

    /**
     * Sanitize filename to prevent security issues
     */
    private String sanitizeFilename(String filename) {
        if (filename == null) {
            return "converted.docx";
        }
        
        // Remove path separators and dangerous characters
        filename = filename.replaceAll("[/\\\\]", "");
        filename = filename.replaceAll("[^a-zA-Z0-9._-]", "_");
        
        // Ensure it has .pdf extension
        if (!filename.toLowerCase().endsWith(".pdf")) {
            filename += ".pdf";
        }
        
        return filename;
    }

    /**
     * Create error response JSON
     */
    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("success", "false");
        return error;
    }

    /**
     * Validation result helper class
     */
    private static class ValidationResult {
        private final boolean valid;
        private final String error;

        private ValidationResult(boolean valid, String error) {
            this.valid = valid;
            this.error = error;
        }

        public static ValidationResult success() {
            return new ValidationResult(true, null);
        }

        public static ValidationResult error(String message) {
            return new ValidationResult(false, message);
        }

        public boolean isValid() {
            return valid;
        }

        public String getError() {
            return error;
        }
    }
}
