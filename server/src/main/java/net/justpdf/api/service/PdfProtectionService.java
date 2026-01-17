package net.justpdf.api.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfProtectionService {

    /**
     * Protects a PDF with AES-256 encryption
     * 
     * @param pdfBytes The original PDF file as bytes
     * @param password The password to protect the PDF
     * @return The protected PDF as bytes
     * @throws Exception If encryption fails
     */
    public byte[] protectPdf(byte[] pdfBytes, String password) throws Exception {
        
        // Load the PDF document
        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            
            // Set access permissions (what users can do after entering password)
            AccessPermission accessPermission = new AccessPermission();
            accessPermission.setCanPrint(true);
            accessPermission.setCanModify(false);
            accessPermission.setCanExtractContent(false);
            accessPermission.setCanModifyAnnotations(false);
            accessPermission.setCanFillInForm(false);
            accessPermission.setCanExtractForAccessibility(true);
            accessPermission.setCanAssembleDocument(false);
            accessPermission.setCanPrintDegraded(false);

            // Create protection policy with AES-256 encryption
            // User password = password to open the file
            // Owner password = password to change permissions (set to same for simplicity)
            StandardProtectionPolicy protectionPolicy = new StandardProtectionPolicy(
                password, // owner password
                password, // user password
                accessPermission
            );
            
            // Use AES-256 encryption (strongest available)
            protectionPolicy.setEncryptionKeyLength(256);
            
            // Apply the protection
            document.protect(protectionPolicy);
            
            // Save to byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            
            return outputStream.toByteArray();
        }
    }
}
