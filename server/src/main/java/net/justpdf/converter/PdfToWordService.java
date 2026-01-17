package net.justpdf.converter;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.*;

/**
 * Service for converting PDF documents to Word (DOCX) format
 * Uses Apache PDFBox for PDF parsing and docx4j for DOCX generation
 */
@Service
public class PdfToWordService {

    private static final int POINTS_PER_INCH = 72;
    private static final int TWIPS_PER_INCH = 1440;

    /**
     * Convert PDF bytes to DOCX output stream
     * @param pdfBytes Input PDF file as byte array
     * @return ByteArrayOutputStream containing the DOCX file
     * @throws Exception if conversion fails
     */
    public ByteArrayOutputStream convertPdfToWord(byte[] pdfBytes) throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PDDocument pdfDocument = null;

        try {
            // Load PDF document
            pdfDocument = PDDocument.load(new ByteArrayInputStream(pdfBytes));

            // Create Word document
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.createPackage();
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();

            // Extract content from PDF
            PdfContentExtractor extractor = new PdfContentExtractor(pdfDocument);
            List<PdfPage> pages = extractor.extractPages();

            // Convert each page to Word content
            ObjectFactory factory = new ObjectFactory();
            
            for (int i = 0; i < pages.size(); i++) {
                PdfPage page = pages.get(i);
                
                // Add page content
                addPageContent(mainDocumentPart, factory, page);
                
                // Add page break after each page except the last
                if (i < pages.size() - 1) {
                    addPageBreak(mainDocumentPart, factory);
                }
            }

            // Save to output stream
            wordMLPackage.save(outputStream);

            return outputStream;

        } finally {
            if (pdfDocument != null) {
                pdfDocument.close();
            }
        }
    }

    /**
     * Add content from a PDF page to the Word document
     */
    private void addPageContent(MainDocumentPart mainDocumentPart, 
                                ObjectFactory factory, 
                                PdfPage page) throws Exception {
        
        for (PdfParagraph paragraph : page.getParagraphs()) {
            P wordParagraph = createParagraph(factory, paragraph);
            mainDocumentPart.addObject(wordParagraph);
        }

        // Add tables if any
        for (PdfTable table : page.getTables()) {
            Tbl wordTable = createTable(factory, table);
            mainDocumentPart.addObject(wordTable);
        }
    }

    /**
     * Create a Word paragraph from PDF paragraph data
     */
    private P createParagraph(ObjectFactory factory, PdfParagraph pdfParagraph) {
        P paragraph = factory.createP();
        PPr paragraphProperties = factory.createPPr();

        // Set paragraph alignment
        if (pdfParagraph.getAlignment() != null) {
            Jc alignment = factory.createJc();
            alignment.setVal(convertAlignment(pdfParagraph.getAlignment()));
            paragraphProperties.setJc(alignment);
        }

        // Set spacing
        PPrBase.Spacing spacing = factory.createPPrBaseSpacing();
        spacing.setBefore(BigInteger.valueOf(pdfParagraph.getSpaceBefore()));
        spacing.setAfter(BigInteger.valueOf(pdfParagraph.getSpaceAfter()));
        paragraphProperties.setSpacing(spacing);

        paragraph.setPPr(paragraphProperties);

        // Add text runs
        for (PdfTextRun textRun : pdfParagraph.getTextRuns()) {
            R run = factory.createR();
            RPr runProperties = factory.createRPr();

            // Set font properties
            if (textRun.isBold()) {
                BooleanDefaultTrue bold = factory.createBooleanDefaultTrue();
                bold.setVal(true);
                runProperties.setB(bold);
            }

            if (textRun.isItalic()) {
                BooleanDefaultTrue italic = factory.createBooleanDefaultTrue();
                italic.setVal(true);
                runProperties.setI(italic);
            }

            // Set font size (convert points to half-points)
            HpsMeasure fontSize = factory.createHpsMeasure();
            fontSize.setVal(BigInteger.valueOf((long)(textRun.getFontSize() * 2)));
            runProperties.setSz(fontSize);

            // Set font family
            if (textRun.getFontFamily() != null) {
                RFonts fonts = factory.createRFonts();
                fonts.setAscii(textRun.getFontFamily());
                fonts.setHAnsi(textRun.getFontFamily());
                runProperties.setRFonts(fonts);
            }

            run.setRPr(runProperties);

            // Add text
            Text text = factory.createText();
            text.setValue(textRun.getText());
            text.setSpace("preserve");
            run.getContent().add(text);

            paragraph.getContent().add(run);
        }

        return paragraph;
    }

    /**
     * Create a Word table from PDF table data
     */
    private Tbl createTable(ObjectFactory factory, PdfTable pdfTable) {
        Tbl table = factory.createTbl();

        // Set table properties
        TblPr tableProperties = factory.createTblPr();
        TblWidth tableWidth = factory.createTblWidth();
        tableWidth.setType("pct");
        tableWidth.setW(BigInteger.valueOf(5000)); // 100% width
        tableProperties.setTblW(tableWidth);
        table.setTblPr(tableProperties);

        // Add rows
        for (List<String> rowData : pdfTable.getRows()) {
            Tr tableRow = factory.createTr();

            for (String cellData : rowData) {
                Tc tableCell = factory.createTc();
                P cellParagraph = factory.createP();
                R run = factory.createR();
                Text text = factory.createText();
                text.setValue(cellData);
                text.setSpace("preserve");
                run.getContent().add(text);
                cellParagraph.getContent().add(run);
                tableCell.getContent().add(cellParagraph);
                tableRow.getContent().add(tableCell);
            }

            table.getContent().add(tableRow);
        }

        return table;
    }

    /**
     * Add page break to Word document
     */
    private void addPageBreak(MainDocumentPart mainDocumentPart, ObjectFactory factory) 
            throws Exception {
        P paragraph = factory.createP();
        R run = factory.createR();
        Br br = factory.createBr();
        br.setType(STBrType.PAGE);
        run.getContent().add(br);
        paragraph.getContent().add(run);
        mainDocumentPart.addObject(paragraph);
    }

    /**
     * Convert PDF alignment to Word alignment
     */
    private JcEnumeration convertAlignment(String alignment) {
        switch (alignment.toLowerCase()) {
            case "center":
                return JcEnumeration.CENTER;
            case "right":
                return JcEnumeration.RIGHT;
            case "justify":
                return JcEnumeration.BOTH;
            default:
                return JcEnumeration.LEFT;
        }
    }

    /**
     * Inner class for extracting content from PDF
     */
    private static class PdfContentExtractor {
        private final PDDocument document;

        public PdfContentExtractor(PDDocument document) {
            this.document = document;
        }

        public List<PdfPage> extractPages() throws IOException {
            List<PdfPage> pages = new ArrayList<>();

            PDFTextStripper stripper = new CustomPDFTextStripper();
            
            for (int i = 1; i <= document.getNumberOfPages(); i++) {
                stripper.setStartPage(i);
                stripper.setEndPage(i);
                
                String pageText = stripper.getText(document);
                PdfPage page = parsePage(pageText);
                pages.add(page);
            }

            return pages;
        }

        private PdfPage parsePage(String text) {
            PdfPage page = new PdfPage();
            
            // Split into paragraphs
            String[] paragraphs = text.split("\n\n+");
            
            for (String para : paragraphs) {
                if (para.trim().isEmpty()) continue;
                
                PdfParagraph paragraph = new PdfParagraph();
                
                // Detect heading (simple heuristic)
                if (para.length() < 100 && para.matches("^[A-Z].*")) {
                    paragraph.setHeading(true);
                }
                
                // Create text run
                PdfTextRun textRun = new PdfTextRun();
                textRun.setText(para.trim());
                textRun.setFontSize(12.0);
                textRun.setFontFamily("Calibri");
                
                paragraph.addTextRun(textRun);
                page.addParagraph(paragraph);
            }
            
            return page;
        }
    }

    /**
     * Custom PDF text stripper for better layout detection
     */
    private static class CustomPDFTextStripper extends PDFTextStripper {
        public CustomPDFTextStripper() throws IOException {
            super();
            setSortByPosition(true);
        }
    }

    // Data classes for PDF content structure
    
    private static class PdfPage {
        private final List<PdfParagraph> paragraphs = new ArrayList<>();
        private final List<PdfTable> tables = new ArrayList<>();

        public void addParagraph(PdfParagraph paragraph) {
            paragraphs.add(paragraph);
        }

        public void addTable(PdfTable table) {
            tables.add(table);
        }

        public List<PdfParagraph> getParagraphs() {
            return paragraphs;
        }

        public List<PdfTable> getTables() {
            return tables;
        }
    }

    private static class PdfParagraph {
        private final List<PdfTextRun> textRuns = new ArrayList<>();
        private String alignment = "left";
        private int spaceBefore = 0;
        private int spaceAfter = 120; // 120 twips = 6pt
        private boolean heading = false;

        public void addTextRun(PdfTextRun textRun) {
            textRuns.add(textRun);
        }

        public List<PdfTextRun> getTextRuns() {
            return textRuns;
        }

        public String getAlignment() {
            return alignment;
        }

        public void setAlignment(String alignment) {
            this.alignment = alignment;
        }

        public int getSpaceBefore() {
            return spaceBefore;
        }

        public int getSpaceAfter() {
            return spaceAfter;
        }

        public void setHeading(boolean heading) {
            this.heading = heading;
            if (heading) {
                spaceBefore = 240; // 12pt before heading
                spaceAfter = 120;   // 6pt after heading
            }
        }
    }

    private static class PdfTextRun {
        private String text;
        private String fontFamily;
        private double fontSize;
        private boolean bold;
        private boolean italic;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public String getFontFamily() {
            return fontFamily;
        }

        public void setFontFamily(String fontFamily) {
            this.fontFamily = fontFamily;
        }

        public double getFontSize() {
            return fontSize;
        }

        public void setFontSize(double fontSize) {
            this.fontSize = fontSize;
        }

        public boolean isBold() {
            return bold;
        }

        public void setBold(boolean bold) {
            this.bold = bold;
        }

        public boolean isItalic() {
            return italic;
        }

        public void setItalic(boolean italic) {
            this.italic = italic;
        }
    }

    private static class PdfTable {
        private final List<List<String>> rows = new ArrayList<>();

        public void addRow(List<String> row) {
            rows.add(row);
        }

        public List<List<String>> getRows() {
            return rows;
        }
    }
}
