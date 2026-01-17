# 🎹 Fill & Sign PDF - Keyboard Shortcuts & Quick Reference

## Keyboard Shortcuts

### Annotation Management
| Shortcut | Action | Description |
|----------|--------|-------------|
| `Delete` | Delete annotation | Removes the selected annotation (with confirmation) |
| `Backspace` | Delete annotation | Alternative to Delete key |
| `Escape` | Deselect | Clears current selection |
| `Ctrl+Z` (Windows/Linux) | Undo | Removes the last annotation added |
| `Cmd+Z` (Mac) | Undo | Removes the last annotation added |

---

## Mouse Actions

### Canvas Interactions
| Action | Result |
|--------|--------|
| **Click** on canvas (Text tool) | Add text at click position |
| **Click** on canvas (Checkmark tool) | Add checkmark at click position |
| **Click** on canvas (Signature tool) | Place signature at click position |
| **Click** on annotation | Select annotation (blue outline appears) |
| **Click** outside annotations | Deselect current selection |

### Annotation Manipulation
| Action | Result |
|--------|--------|
| **Drag** annotation | Move annotation to new position |
| **Drag** corner handle (signature) | Resize signature (maintains aspect ratio) |
| **Drag** corner handle (text) | Change text font size |
| **Click** X button | Delete annotation (with confirmation) |
| **Hover** over annotation | Show delete button |

---

## Toolbar Tools

### Primary Tools
| Tool | Icon | Keyboard | Description |
|------|------|----------|-------------|
| **Add Text** | 📝 | - | Add text annotations to PDF |
| **Signature** | ✍️ | - | Create and place signatures |
| **Checkmark** | ✓ | - | Add checkmarks for forms |
| **Undo** | ↶ | Ctrl+Z | Remove last annotation |
| **Download** | 📥 | - | Save filled & signed PDF |

### Text Options (when Text tool active)
| Option | Values | Description |
|--------|--------|-------------|
| **Font Size** | 10, 12, 14, 16, 18, 20, 24pt | Set text size |
| **Color Picker** | Any color | Choose text color |

---

## Signature Creation

### Draw Method
1. Click **Signature** button
2. Select **Draw** tab
3. Draw with mouse on canvas
4. Click **Add Signature**
5. Click on PDF to place

### Type Method
1. Click **Signature** button
2. Select **Type** tab
3. Type your name
4. Choose signature style (1, 2, or 3)
5. Click **Add Signature**
6. Click on PDF to place

---

## Annotation States

### Visual Indicators
| State | Visual | Description |
|-------|--------|-------------|
| **Normal** | No outline | Default state |
| **Hover** | Dashed outline | Mouse over annotation |
| **Selected** | Blue outline + handles | Currently selected |
| **Being Moved** | - | While dragging |
| **Being Resized** | - | While using corner handles |

### Delete Button
| State | Visibility |
|-------|------------|
| **Unselected** | Shows on hover only |
| **Selected** | Always visible |

---

## Feature Matrix

### Annotation Types
| Type | Add | Select | Move | Resize | Delete |
|------|-----|--------|------|--------|--------|
| **Text** | ✅ | ✅ | ✅ | ✅ (font size) | ✅ |
| **Signature** | ✅ | ✅ | ✅ | ✅ (aspect ratio) | ✅ |
| **Checkmark** | ✅ | ✅ | ✅ | ❌ | ✅ |

### Supported Actions
| Action | Supported | Method |
|--------|-----------|--------|
| **Add** | ✅ | Click canvas with tool selected |
| **Select** | ✅ | Click annotation |
| **Move** | ✅ | Drag annotation |
| **Resize** | ✅ | Drag corner handles (text/signature only) |
| **Delete** | ✅ | Delete key or X button |
| **Deselect** | ✅ | Escape key or click outside |
| **Undo** | ✅ | Ctrl+Z or Undo button |
| **Download** | ✅ | Download button |

---

## Workflow Examples

### Example 1: Fill a Form
1. Upload PDF
2. Click **Add Text** (or it's already selected)
3. Click in first form field
4. Type your information
5. Press Enter
6. Repeat for other fields
7. Click **Download**

### Example 2: Sign a Document
1. Upload PDF
2. Click **Signature**
3. Draw or type your signature
4. Click **Add Signature**
5. Click on PDF where signature should go
6. (Optional) Resize by dragging corner handles
7. Click **Download**

### Example 3: Fill & Sign
1. Upload PDF
2. Add text to form fields
3. Click **Signature** to add signature
4. Click **Checkmark** to check boxes
5. Review (select, move, resize as needed)
6. Click **Download**

### Example 4: Edit Existing Annotations
1. Click annotation to select it
2. **To move**: Drag to new position
3. **To resize**: Drag corner handles
4. **To delete**: Press Delete or click X
5. **To undo**: Press Ctrl+Z
6. Click **Download** when satisfied

---

## Tips & Tricks

### 💡 Pro Tips
- **Keyboard shortcuts save time**: Use Delete, Escape, and Ctrl+Z for faster editing
- **Preview before placing**: Hover with signature tool to see preview
- **Select for precision**: Select annotations before moving for better control
- **Use Escape to reset**: Press Escape to quickly deselect and start fresh
- **Undo is your friend**: Don't worry about mistakes, Ctrl+Z has you covered

### 🎯 Best Practices
- **Fill text first**: Complete all text fields before adding signatures
- **Check boxes last**: Add checkmarks after all other content
- **Review before download**: Select and move annotations to perfect positions
- **Test resize**: Try resizing signatures to find the perfect size
- **Save often**: Download intermediate versions as backups

### ⚠️ Common Mistakes
- **Forgetting to select**: Must select annotation before moving/resizing
- **Wrong tool active**: Check toolbar to see which tool is selected
- **Not confirming delete**: Always confirm deletion dialog
- **Placing signature twice**: One placement per signature creation (intentional)
- **Skipping preview**: Always preview downloaded PDF before sharing

---

## Browser Support

### Desktop
| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Opera | 76+ | ✅ Full |

### Mobile
| Browser | Version | Support |
|---------|---------|---------|
| Safari (iOS) | 13+ | ⚠️ Basic |
| Chrome (Android) | 90+ | ⚠️ Basic |

**Note**: Mobile support is functional but lacks touch gesture optimization.

---

## Limitations

### Current Limitations
- ❌ No multi-select (can only select one annotation at a time)
- ❌ No redo functionality (only undo)
- ❌ No alignment guides
- ❌ Checkmarks cannot be resized
- ❌ Limited mobile touch gestures
- ❌ No rotation of annotations
- ❌ No opacity/transparency control

### Workarounds
- **Multi-select**: Move/resize one at a time
- **Redo**: Re-add annotation manually
- **Alignment**: Use visual estimation
- **Mobile**: Use desktop for best experience

---

## Privacy & Security

### How It Works
- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No Upload**: Files never leave your device
- ✅ **No Tracking**: We don't track your documents
- ✅ **No Storage**: Nothing saved on our servers

### What We Store
- ✅ **Help Banner Preference**: LocalStorage only (whether you dismissed the help banner)
- ❌ **No PDF Content**: Never stored
- ❌ **No Annotations**: Not saved anywhere
- ❌ **No Personal Data**: Not collected

---

## Performance

### Expected Performance
| Metric | Value |
|--------|-------|
| Page load | <2 seconds |
| PDF render (small) | 1-2 seconds |
| PDF render (large) | 3-5 seconds |
| Add annotation | Instant |
| Move/resize | Instant |
| Download | 2-3 seconds |

### Optimization Tips
- Use smaller PDFs when possible
- Limit annotations to what's necessary
- Close other browser tabs for better performance
- Use modern browsers for best speed

---

## Troubleshooting

### Issue: Keyboard shortcuts don't work
**Solution**: Click on the PDF canvas area first to ensure focus

### Issue: Can't resize annotation
**Solution**: Only signatures and text can be resized (not checkmarks)

### Issue: Help banner keeps appearing
**Solution**: Click the X button to dismiss permanently

### Issue: Downloaded PDF missing annotations
**Solution**: Wait for download to complete, check browser downloads folder

### Issue: Signature looks pixelated
**Solution**: Draw larger or type instead for clearer signatures

---

## Getting Help

### Resources
- **Documentation**: See FILL_SIGN_ENHANCEMENTS.md
- **Changelog**: See CHANGELOG.md
- **Deployment**: See QUICK_DEPLOYMENT.md

### Quick Reference Card

```
┌─────────────────────────────────────────┐
│  FILL & SIGN PDF - QUICK REFERENCE      │
├─────────────────────────────────────────┤
│  KEYBOARD SHORTCUTS                     │
│  Delete/Backspace → Delete selected     │
│  Escape          → Deselect             │
│  Ctrl+Z          → Undo                 │
├─────────────────────────────────────────┤
│  MOUSE ACTIONS                          │
│  Click           → Select/Add           │
│  Drag            → Move                 │
│  Drag handles    → Resize               │
│  Click X         → Delete               │
├─────────────────────────────────────────┤
│  TOOLS                                  │
│  📝 Add Text    ✍️ Signature            │
│  ✓ Checkmark    ↶ Undo                 │
│  📥 Download                            │
└─────────────────────────────────────────┘
```

---

*Print this page for offline reference!*  
*Last Updated: January 3, 2026*
