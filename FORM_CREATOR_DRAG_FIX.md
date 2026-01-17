# PDF Form Creator - Drag & Drop Fix

## Issue
When dragging form fields (text fields, checkboxes, etc.), the fields were not moving correctly and would go off-frame or jump to incorrect positions.

## Root Cause
The drag handling code had two critical bugs:

### 1. Incorrect Drag Start Calculation
**Location:** `handleFieldMouseDown` function (line ~710)

**Problem:**
```javascript
state.dragStart = {
  x: e.clientX - field.x,
  y: e.clientY - field.y
};
```

This was using `e.clientX` and `e.clientY` which are **screen coordinates** (relative to the viewport), not canvas coordinates. This caused the offset calculation to be completely wrong.

**Fix:**
```javascript
const coords = getCanvasCoordinates(e);
state.isDragging = true;
state.dragStart = {
  x: coords.x - field.x,
  y: coords.y - field.y
};
```

Now correctly uses canvas-relative coordinates via `getCanvasCoordinates()`.

### 2. Overly Complex and Broken Drag Calculation
**Location:** `mousemove` event handler (line ~725)

**Problem:**
```javascript
state.selectedField.x = snapToGrid(Math.max(0, Math.min(
  elements.canvas.width - state.selectedField.width, 
  e.clientX - elements.canvas.getBoundingClientRect().left - (state.dragStart.x - state.selectedField.x)
)));
```

This calculation was:
- Mixing screen coordinates (`e.clientX`) with canvas calculations
- Using an incorrect offset formula
- Unnecessarily complex and hard to debug

**Fix:**
```javascript
const coords = getCanvasCoordinates(e);

// Calculate new position based on mouse position and initial offset
let newX = coords.x - state.dragStart.x;
let newY = coords.y - state.dragStart.y;

// Constrain to canvas boundaries
newX = Math.max(0, Math.min(elements.canvas.width - state.selectedField.width, newX));
newY = Math.max(0, Math.min(elements.canvas.height - state.selectedField.height, newY));

// Apply snap to grid if enabled
state.selectedField.x = snapToGrid(newX);
state.selectedField.y = snapToGrid(newY);
```

Clean, simple calculation that:
1. Gets canvas-relative coordinates
2. Subtracts the initial offset (where in the field the user clicked)
3. Constrains to canvas boundaries
4. Applies grid snapping if enabled

## How It Works Now

### Drag Flow:
1. **Mouse Down**: Store the offset from the field's top-left corner to the click point (in canvas coordinates)
2. **Mouse Move**: Calculate new position = current mouse position - stored offset
3. **Boundary Check**: Ensure field stays within canvas (0 to canvas.width/height)
4. **Grid Snap**: Optionally snap to grid if enabled (20px grid by default)
5. **Render**: Update the field's visual position

### Coordinate System:
- All drag calculations use **canvas-relative coordinates** via `getCanvasCoordinates()`
- `getCanvasCoordinates()` converts screen coordinates to canvas coordinates:
  ```javascript
  const rect = elements.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  ```

## Benefits

✅ **Accurate Dragging**: Fields follow the mouse cursor precisely  
✅ **Stays Within Bounds**: Fields cannot be dragged outside the canvas  
✅ **Grid Snapping Works**: Optional grid snapping (toggle-able) works correctly  
✅ **Smooth Movement**: No jumping or unexpected behavior  
✅ **Clean Code**: Simple, maintainable drag logic  

## Testing Checklist

- [x] Click and drag a text field - should move smoothly
- [x] Click near edge of field - field should maintain offset correctly
- [x] Drag field to canvas edges - should stop at boundaries
- [x] Toggle "Snap to Grid" - should snap to 20px grid when enabled
- [x] Drag multiple different field types (checkbox, radio, dropdown, signature, date)
- [x] Resize fields using corner handles - should work independently of drag
- [x] Multi-page PDFs - fields on each page should drag correctly

## Files Modified
- `/Users/millionairemindset/JustPDF/tools/form-creator.html`
  - Fixed `handleFieldMouseDown()` to use canvas coordinates
  - Simplified and fixed drag calculation in `mousemove` handler

## Related Fixes
This complements the previous fix for full-page display (1:1 canvas scale), ensuring fields can be accurately placed anywhere on the PDF.

## Status
✅ FIXED - Fields now drag smoothly and stay within canvas boundaries.
