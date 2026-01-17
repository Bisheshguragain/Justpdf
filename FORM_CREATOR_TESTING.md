# PDF Form Creator - Testing Checklist

## Pre-Test Setup
- [ ] Open `/tools/form-creator.html` in a modern browser (Chrome, Firefox, Safari, Edge)
- [ ] Have test PDFs ready (Letter, A4, multi-page documents)
- [ ] Open browser DevTools console to check for errors

## Basic Functionality Tests

### 1. PDF Upload
- [ ] Click "Select PDF" button to upload
- [ ] Drag and drop a PDF onto the upload area
- [ ] Verify upload area hides and builder interface shows
- [ ] Check console for any errors

### 2. PDF Display (CRITICAL - This was the bug fix)
- [ ] **Verify ENTIRE PDF page is visible**
- [ ] Standard Letter PDF should show ~612x792 pixels
- [ ] No clipping or cut-off at bottom/right
- [ ] Canvas should fit in scrollable container
- [ ] Grid overlay aligns with canvas if enabled

### 3. Field Placement
- [ ] Click each field type to add to canvas:
  - [ ] Text Field
  - [ ] Checkbox
  - [ ] Radio Button
  - [ ] Dropdown
  - [ ] Signature
  - [ ] Date Field
- [ ] Fields appear at center of canvas
- [ ] **Fields can be placed ANYWHERE on the page (top, middle, bottom, left, right, corners)**
- [ ] Field count updates correctly

### 4. Field Manipulation
- [ ] Drag fields to move them
- [ ] Resize fields using corner handles
- [ ] Select fields (border turns green)
- [ ] Snap to Grid works when enabled
- [ ] Delete button (×) appears on selected field
- [ ] Click delete button removes field

### 5. Field Properties
- [ ] Select a field to see properties panel
- [ ] Edit field name
- [ ] Edit label/placeholder
- [ ] Toggle "Required Field"
- [ ] For text fields: change font size and alignment
- [ ] For dropdowns: add custom options
- [ ] For radio buttons: set group name and value
- [ ] Position & Size values update when moving/resizing

### 6. Multi-Page PDFs
- [ ] Upload a multi-page PDF
- [ ] Page navigation shows correct count (e.g., "Page 1 of 3")
- [ ] Previous/Next buttons work
- [ ] Add fields to different pages
- [ ] Navigate between pages - fields persist on their pages
- [ ] Total field count includes all pages

### 7. Export/Download (CRITICAL - Verify coordinates are correct)
- [ ] Add several fields to different positions
- [ ] Click "Download Form"
- [ ] Loading overlay appears
- [ ] PDF downloads successfully
- [ ] **Open downloaded PDF in Adobe Acrobat or Preview**
- [ ] **Verify all fields are in the EXACT positions they appeared in the builder**
- [ ] Test filling out the form fields
- [ ] Save filled PDF and verify data persists

## Edge Cases & Stress Tests

### 8. Large PDFs
- [ ] Upload a large PDF (multiple pages, large file size)
- [ ] Verify scrolling works for oversized pages
- [ ] Performance remains smooth

### 9. Many Fields
- [ ] Add 20+ fields to a page
- [ ] Verify performance doesn't degrade
- [ ] All fields render correctly
- [ ] Export works with many fields

### 10. Field Overlap
- [ ] Place fields on top of each other
- [ ] Verify both can be selected and moved
- [ ] Export handles overlapping fields

### 11. Boundary Testing
- [ ] Try to drag field outside canvas boundaries
- [ ] Fields should stay within canvas
- [ ] Resize to make field very small or very large
- [ ] Export maintains boundaries

## Error Handling

### 12. Invalid Operations
- [ ] Try to download without adding fields (should alert)
- [ ] Upload non-PDF file (should be prevented by file input)
- [ ] Clear all fields and verify
- [ ] Refresh page and re-upload

## Browser Compatibility

### 13. Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS)
- [ ] Check console for warnings/errors in each

## SEO & Performance

### 14. Page Load
- [ ] Check page loads quickly (<3 seconds)
- [ ] All resources load (Tailwind, PDF.js, PDF-lib)
- [ ] No 404 errors in Network tab

### 15. AdSense
- [ ] Verify 2 AdSense units are present
- [ ] Check they're properly initialized
- [ ] Ads display correctly (if test ads enabled)

## Known Issues to Watch For

- [ ] ✅ FIXED: PDF not showing full page (was using 1.5x scale, now 1.0x)
- [ ] ✅ FIXED: Coordinate mismatch on export (was dividing by scale, now 1:1)
- [ ] Check: Fields layer pointer-events (should be none, fields should be auto)
- [ ] Check: Canvas and fieldsLayer dimensions match exactly

## Success Criteria

✅ **Primary Goal**: Full PDF page is visible and fields can be placed anywhere
✅ **Secondary Goal**: Exported PDF has fields in correct positions
✅ **Tertiary Goal**: All field types work and properties can be edited

## Test Results

Date: ___________
Tester: ___________

| Test Section | Pass/Fail | Notes |
|-------------|-----------|-------|
| PDF Upload | ☐ | |
| PDF Display | ☐ | |
| Field Placement | ☐ | |
| Field Manipulation | ☐ | |
| Field Properties | ☐ | |
| Multi-Page PDFs | ☐ | |
| Export/Download | ☐ | |
| Large PDFs | ☐ | |
| Many Fields | ☐ | |
| Field Overlap | ☐ | |
| Boundary Testing | ☐ | |
| Invalid Operations | ☐ | |
| Cross-Browser | ☐ | |
| Page Load | ☐ | |
| AdSense | ☐ | |

## Additional Notes:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
