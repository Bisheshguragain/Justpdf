package net.justpdf.api.controller;

import net.justpdf.api.service.PdfProtectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from your static frontend
public class PdfProtectionController {

    @Autowired
    private PdfProtectionService pdfProtectionService;

    @PostMapping(value = "/protect-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> protectPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) {
        
        try {
            // Validate inputs
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            if (password == null || password.trim().length() < 6) {
                return ResponseEntity.badRequest().build();
            }

            // Protect the PDF
            byte[] protectedPdfBytes = pdfProtectionService.protectPdf(
                file.getBytes(), 
                password.trim()
            );

            // Return the protected PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            
            // Safely handle potentially null filename
            String originalFilename = file.getOriginalFilename();
            String outputFilename = (originalFilename != null && !originalFilename.isEmpty()) 
                ? originalFilename.replace(".pdf", "_protected.pdf")
                : "protected.pdf";
            
            headers.setContentDispositionFormData("attachment", outputFilename);
            headers.setContentLength(protectedPdfBytes.length);

            return new ResponseEntity<>(protectedPdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("PDF Protection API is running");
    }
}
