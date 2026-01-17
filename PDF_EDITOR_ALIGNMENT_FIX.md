# 🔧 PDF Editor - Image & Shape Alignment Fix

**Date:** January 3, 2026  
**Issue:** Image and shape selection boxes not aligned with the actual elements  
**Status:** ✅ FIXED

---

## Problem

When users added images or shapes to the PDF, the interactive selection overlay (the box you click to select/resize the element) appeared in a different location than the actual visual element on the canvas.

### Symptoms
- **Image added:** Visual image appears in one location, but selection box is offset above it
- **Shape added:** Visual shape appears correctly, but selection box is misaligned
- **Confusing UX:** Users had to click in the wrong place to select elements
- **Resize issues:** Dragging handles didn't match the visual element

### Root Cause
The overlay positioning logic was treating all annotation types the same way, using a calculation meant for text (`y - height`) for images and shapes as well.

**Why this happened:**
- **Text annotations:** Use bottom-left as origin point (Canvas fillText behavior)
- **Images/Shapes:** Use top-left as origin point (Canvas drawImage/fillRect behavior)
- **Original code:** Applied text positioning to all types

---

## Solution

### Fixed Overlay Positioning

**Before (Incorrect):**
```javascript
overlay.style.left = annotation.x + 'px';
overlay.style.top = (annotation.y - height) + 'px'; // Wrong for images/shapes!
```

**After (Correct):**
```javascript
// Position overlay based on annotation type
// Text uses bottom-left as origin, others use top-left
overlay.style.left = annotation.x + 'px';
if (annotation.type === 'text') {
  overlay.style.top = (annotation.y - height) + 'px';
} else {
  // Images, shapes, highlights use top-left origin
  overlay.style.top = annotation.y + 'px';
}
```

---

## Technical Details

### Canvas Coordinate Systems

#### Text (fillText)
```javascript
ctx.fillText(text, x, y);
// (x, y) = bottom-left corner of the text baseline
// To position overlay: overlay.top = y - textHeight
```

#### Images (drawImage)
```javascript
ctx.drawImage(img, x, y, width, height);
// (x, y) = top-left corner
// To position overlay: overlay.top = y
```

#### Shapes (fillRect/strokeRect)
```javascript
ctx.fillRect(x, y, width, height);
// (x, y) = top-left corner
// To position overlay: overlay.top = y
```

#### Highlights (fillRect with opacity)
```javascript
ctx.fillRect(x, y, width, height);
// (x, y) = top-left corner
// To position overlay: overlay.top = y
```

### Why Text is Different
The Canvas API's `fillText()` method positions text by its baseline (bottom), while all other drawing methods use the top-left corner. This is a fundamental difference in the Canvas 2D API.

---

## Testing

### Test Cases

#### ✅ Image Alignment
1. Add an image to the PDF
2. Verify the selection box appears exactly over the image
3. Click the image - should select immediately
4. Drag corner handles - should resize the visible image
5. Move the image - overlay and image move together

#### ✅ Shape Alignment
1. Drag to create a rectangle
2. Verify the selection box matches the shape exactly
3. Try circles and lines too
4. All should have perfect alignment

#### ✅ Highlight Alignment
1. Drag to create a highlight
2. Selection box should match the highlighted area perfectly
3. Resize handles should be at the corners of the highlight

#### ✅ Text Alignment (Should Still Work)
1. Add text annotation
2. Verify text selection box is positioned correctly
3. Text overlay should encompass the text
4. Resize handles should work properly

---

## Visual Comparison

### Before Fix

```
Visual Image:     [████████]
                  [████████]
                  [████████]

Selection Box:    [--------]  ← WRONG POSITION!
                  [--------]
                  [--------]

User clicks here  ^
  but nothing happens (clicking empty space)
```

### After Fix

```
Visual Image:     [████████]
                  [████████]  
                  [████████]

Selection Box:    [████████]  ← CORRECT!
                  [████████]
                  [████████]

User clicks here  ^
  and element is selected ✓
```

---

## Impact

### Fixed Issues
✅ **Image selection** - Now works perfectly on first click  
✅ **Shape selection** - Selection box perfectly aligned  
✅ **Highlight selection** - Exact alignment  
✅ **Resize handles** - Positioned at correct corners  
✅ **Move by dragging** - Visual feedback matches element  

### Maintained Features
✅ **Text selection** - Still works correctly  
✅ **Multi-select** - No impact  
✅ **Copy/Paste** - Works as expected  
✅ **Export** - No change to PDF generation  

---

## Code Changes

### Files Modified
- `/tools/pdf-editor.html` - Updated `renderAnnotationsOverlay()` function

### Lines Changed
- **1 condition added** to differentiate text from other types
- **Logic simplified** for better maintainability
- **Comments added** to explain coordinate system differences

---

## Related Components

### Not Affected
- Canvas drawing logic (already correct)
- Annotation data structure (unchanged)
- Resize logic (works with any coordinate system)
- Export logic (converts coordinates correctly)

### Improved
- User experience (no more confusion)
- Selection accuracy (pixel-perfect)
- Visual feedback (matches expectations)

---

## Prevention

### Why It Won't Happen Again
1. **Clear comments** - Code now explains why text is different
2. **Type checking** - Conditional logic based on annotation type
3. **Testing** - All annotation types tested for alignment
4. **Documentation** - This document explains the coordinate systems

### Best Practices Applied
- Understand Canvas API coordinate systems
- Test all element types when making positioning changes
- Add comments explaining coordinate system differences
- Use type-specific logic when needed

---

## Performance

### Impact: None
- **Same number of operations** (just different calculation)
- **No additional overhead**
- **Rendering speed unchanged**

---

## Conclusion

The alignment fix resolves the frustrating UX issue where users couldn't click on images and shapes to select them. Now all annotation types have perfect pixel-perfect alignment between the visual element and the interactive selection overlay.

**Result:**  
✅ Professional, polished user experience  
✅ Intuitive selection and editing  
✅ Consistent behavior across all element types  

---

**Status:** ✅ COMPLETE & TESTED  
**User Impact:** 🎯 CRITICAL FIX  
**Ready:** ✅ PRODUCTION
