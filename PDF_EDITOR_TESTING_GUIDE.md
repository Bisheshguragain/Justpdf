# PDF Editor - Quick Testing Guide

## Test All Fixed Features (5 Minutes)

### Setup
1. Open `http://localhost:8000/tools/pdf-editor.html` in your browser
2. Upload any PDF file
3. Follow the tests below

---

## Test 1: Highlight Tool (Drag-to-Select) ✅

**Steps:**
1. Click the **🖍️ Highlight** button
2. Choose a highlight color (yellow by default)
3. **Click and drag** across any area of the PDF
4. Release the mouse

**Expected Result:**
- While dragging, you should see a preview of the highlight
- After releasing, the highlight appears at the exact area you selected
- The highlight is automatically selected (green border)
- Corner handles appear for resizing

**Pass/Fail:** ___

---

## Test 2: Image Upload and Display ✅

**Steps:**
1. Click the **🖼️ Image** button
2. Click anywhere on the PDF canvas
3. Select an image file from your computer
4. Wait for it to load

**Expected Result:**
- Image appears at the location you clicked
- Image shows in both editor and preview panels
- Corner handles appear for resizing
- You can drag the image to move it

**Pass/Fail:** ___

---

## Test 3: Resize Images ✅

**Steps:**
1. Select an existing image (click on it)
2. Drag the **bottom-right corner handle** (green circle)
3. Try all four corner handles

**Expected Result:**
- Image resizes smoothly as you drag
- Preview updates in real-time
- Image maintains quality
- Minimum size of 20x20 pixels is enforced

**Pass/Fail:** ___

---

## Test 4: Resize Highlights ✅

**Steps:**
1. Create a highlight (drag-to-select)
2. Select it (click on it)
3. Drag any corner handle to resize

**Expected Result:**
- Highlight resizes to cover more or less area
- Preview updates in real-time
- Highlight color and opacity remain the same

**Pass/Fail:** ___

---

## Test 5: Resize Shapes ✅

**Steps:**
1. Click the **⬜ Shape** button
2. Select "Rectangle"
3. **Drag to draw** a rectangle
4. With it selected, drag a corner handle to resize

**Expected Result:**
- Shape resizes properly
- Filled/outlined style is preserved
- Color remains the same

**Pass/Fail:** ___

---

## Test 6: Text Annotations (No Resize Handles) ✅

**Steps:**
1. Click the **📝 Text** button
2. Click on the canvas and enter some text
3. Select the text annotation

**Expected Result:**
- Text appears on the canvas
- **NO corner handles** appear (text is not resizable via handles)
- Edit button (✎) appears
- Delete button (×) appears
- You can move the text by dragging

**Pass/Fail:** ___

---

## Test 7: Shape Drawing (Drag-to-Draw) ✅

**Steps:**
1. Click the **⬜ Shape** button
2. Select "Circle"
3. **Click and drag** to draw a circle of any size
4. Try the same with "Rectangle"

**Expected Result:**
- While dragging, you see a preview of the shape
- After releasing, shape appears at the drawn size
- Shape is automatically selected
- You can resize it further with handles

**Pass/Fail:** ___

---

## Test 8: Multi-Select and Resize ✅

**Steps:**
1. Create multiple annotations (images, shapes, highlights)
2. Select one annotation
3. Hold **Ctrl** (Cmd on Mac) and click another annotation
4. Try to resize with handles

**Expected Result:**
- Multiple annotations are selected (purple border for multi-select)
- Corner handles appear only on the first selected item
- You can drag to move all selected items together
- Resize works on the first selected annotation

**Pass/Fail:** ___

---

## Test 9: Copy/Paste Images ✅

**Steps:**
1. Upload and place an image
2. Select the image
3. Press **Ctrl+C** (Cmd+C on Mac)
4. Press **Ctrl+V** (Cmd+V on Mac)

**Expected Result:**
- A duplicate image appears, offset slightly
- The duplicate is automatically selected
- Both images show in the preview

**Pass/Fail:** ___

---

## Test 10: Delete Annotations ✅

**Steps:**
1. Select any annotation
2. Click the **×** (delete button) on the annotation
3. Or press **Delete** or **Backspace** key

**Expected Result:**
- Confirmation dialog appears
- After confirming, annotation is removed
- Preview updates immediately

**Pass/Fail:** ___

---

## Test 11: Download PDF with All Annotations ✅

**Steps:**
1. Add various annotations:
   - Some text
   - An image
   - A highlight (dragged to select)
   - A shape (drawn by dragging)
2. Click **⬇️ Download PDF**
3. Open the downloaded PDF

**Expected Result:**
- PDF downloads successfully
- All text annotations appear in the PDF
- Shapes and highlights appear correctly
- *Note: Image embedding may have limitations (see known issues)*

**Pass/Fail:** ___

---

## Test 12: Inline Text Editing ✅

**Steps:**
1. Add a text annotation
2. **Double-click** the text
3. Edit the text in the inline editor
4. Press **Enter** to save

**Expected Result:**
- Inline text editor appears at the text location
- You can edit the text directly
- Pressing Enter saves the changes
- Pressing Escape cancels

**Pass/Fail:** ___

---

## Browser Compatibility Tests

Test the above in multiple browsers:

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browser (optional)

---

## Performance Tests

- [ ] Upload a large PDF (10+ pages) - should load smoothly
- [ ] Add 20+ annotations - should remain responsive
- [ ] Rapid drag/resize operations - should be smooth

---

## Quick Reference: All Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Undo | Ctrl+Z (Cmd+Z) |
| Copy | Ctrl+C (Cmd+C) |
| Paste | Ctrl+V (Cmd+V) |
| Duplicate | Ctrl+D (Cmd+D) |
| Delete | Delete or Backspace |
| Deselect | Escape |
| Select All | Ctrl+A (Cmd+A) |

---

## Common Issues and Solutions

### Issue: Highlight not appearing
**Solution:** Make sure to drag at least 10 pixels before releasing

### Issue: Image not showing
**Solution:** Wait a moment for the image to load, it should appear within 1-2 seconds

### Issue: Can't resize text
**Solution:** This is intentional - use the font size selector in the toolbar

### Issue: Preview not updating
**Solution:** Click on the preview panel to refresh, or change pages

---

## Report Issues

If any test fails, document:
1. Test number and name
2. Steps taken
3. Expected result
4. Actual result
5. Browser and OS
6. Screenshot (if applicable)

---

*Testing Guide - January 3, 2026*
