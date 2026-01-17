# 🚀 Header & Footer PDF Tool - Quick Reference

## Overview
A professional PDF tool for adding custom headers and footers with dynamic variables, live preview, and full customization.

---

## ⚡ Quick Start

### 3 Simple Steps:
1. **Upload PDF** → Drag & drop or click to select
2. **Configure** → Set header/footer text, size, color
3. **Download** → Click "Apply & Download"

---

## 📋 Dynamic Variables

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{page}` | Current page number | `1`, `2`, `3`... |
| `{total}` | Total pages in document | `10` |
| `{date}` | Today's date (MM/DD/YYYY) | `01/03/2026` |

### Variable Usage Examples:
```
"Page {page}"           → "Page 1"
"Page {page} of {total}" → "Page 1 of 10"
"{date}"                 → "01/03/2026"
"Document - {page}"      → "Document - 1"
```

---

## 🎨 Configuration Options

### Header Settings
- **Left Text**: Appears on the left side
- **Center Text**: Appears in the center
- **Right Text**: Appears on the right side
- **Font Size**: 8pt to 16pt
- **Color**: Any color via color picker
- **Top Margin**: Distance from top edge (0-100px)

### Footer Settings  
- **Left Text**: Appears on the left side
- **Center Text**: Appears in the center
- **Right Text**: Appears on the right side
- **Font Size**: 8pt to 16pt
- **Color**: Any color via color picker
- **Bottom Margin**: Distance from bottom edge (0-100px)

---

## 💡 Common Configurations

### Standard Page Numbers (Footer Right)
```
Footer Right: "Page {page} of {total}"
```
**Result**: Page 1 of 10, Page 2 of 10, etc.

### Date Header (Top Right)
```
Header Right: "{date}"
```
**Result**: 01/03/2026

### Company Branding (Header Left + Footer Center)
```
Header Left: "Acme Corporation"
Footer Center: "Confidential"
```

### Full Professional Setup
```
Header Left: "Company Name Inc."
Header Center: "Annual Report 2025"
Header Right: "{date}"

Footer Left: "© 2026 All Rights Reserved"
Footer Center: "Confidential"
Footer Right: "Page {page} of {total}"
```

---

## 🎯 Workflow

### Basic Workflow:
1. Upload your PDF
2. Enable header and/or footer (checkboxes)
3. Enter your text in desired positions
4. Use variables where needed
5. Adjust font size and color
6. Click "Preview" to see result
7. Navigate pages to verify
8. Click "Apply & Download"

### Advanced Workflow:
1. Upload PDF
2. Switch to Header tab
3. Configure all header settings
4. Switch to Footer tab
5. Configure all footer settings
6. Preview on multiple pages
7. Fine-tune margins and colors
8. Apply and download

---

## 🔧 Tips & Best Practices

### ✅ Do's:
- **Use variables** for dynamic content ({page}, {date})
- **Preview first** before applying
- **Keep text concise** to avoid overflow
- **Check all pages** to ensure consistency
- **Use appropriate margins** (20px is good default)

### ❌ Don'ts:
- **Don't use very long text** - it may overflow
- **Don't skip preview** - always verify first
- **Don't use tiny margins** - text may be cut off
- **Don't forget variables** - type {page} not "page"

---

## 🎨 Design Examples

### Minimalist (Page Numbers Only)
```
Footer Right: "{page}"
Font Size: 10pt
Color: #666666 (gray)
```

### Professional Business
```
Header Left: "Quarterly Report Q4"
Header Right: "{date}"
Footer Center: "Confidential - Internal Use Only"
Footer Right: "Page {page}"
Font Size: 10pt
Color: #000000 (black)
```

### Academic Paper
```
Header Right: "John Doe - Thesis 2026"
Footer Center: "{page}"
Font Size: 10pt
Color: #000000
```

### Legal Document
```
Header Left: "Case No. ABC-123"
Header Right: "{date}"
Footer Left: "Attorney Work Product - Privileged"
Footer Right: "Page {page} of {total}"
Font Size: 10pt
Color: #000000
```

---

## 🐛 Troubleshooting

### Problem: Text doesn't appear
**Solution**: Make sure "Enable Header" or "Enable Footer" is checked

### Problem: Variables show as {page} instead of numbers
**Solution**: You're viewing the input, not the result. Click "Preview" or "Apply"

### Problem: Text is cut off
**Solution**: Use shorter text or smaller font size

### Problem: Preview doesn't update
**Solution**: Click the "Preview" button manually

### Problem: Download fails
**Solution**: Try with a smaller PDF, check browser console for errors

---

## ⌨️ Interface Guide

### Main Sections:
1. **Upload Area** - Drop PDF or click to select
2. **Settings Panel** - Configure header/footer
3. **Preview Area** - See live preview
4. **Page Navigation** - Browse through pages

### Buttons:
- **Header Tab** - Switch to header settings
- **Footer Tab** - Switch to footer settings
- **👁️ Preview** - Update preview with current settings
- **✓ Apply & Download** - Process and download PDF
- **← Previous** - Go to previous page
- **Next →** - Go to next page

---

## 📊 Feature Comparison

| Feature | Header | Footer |
|---------|--------|--------|
| Left Text | ✅ | ✅ |
| Center Text | ✅ | ✅ |
| Right Text | ✅ | ✅ |
| Variables | ✅ | ✅ |
| Custom Size | ✅ | ✅ |
| Custom Color | ✅ | ✅ |
| Margins | ✅ | ✅ |
| Enable/Disable | ✅ | ✅ |

---

## 🔒 Privacy

- ✅ **100% Client-Side** - No server upload
- ✅ **No Tracking** - Your documents stay private
- ✅ **No Storage** - Files processed in browser only
- ✅ **Secure** - All processing happens locally

---

## 📱 Device Support

| Device | Support Level |
|--------|---------------|
| Desktop | ✅ Full Support |
| Laptop | ✅ Full Support |
| Tablet | ✅ Good Support |
| Phone | ⚠️ Basic Support (use desktop for best experience) |

---

## 🎓 Learning Examples

### Example 1: Simple Page Numbers
```
Goal: Add "Page X" to bottom right

Steps:
1. Upload PDF
2. Enable Footer
3. Footer Right: "Page {page}"
4. Apply & Download
```

### Example 2: Professional Header
```
Goal: Company name left, date right

Steps:
1. Upload PDF
2. Enable Header
3. Header Left: "Acme Corp"
4. Header Right: "{date}"
5. Apply & Download
```

### Example 3: Complete Setup
```
Goal: Full header and footer

Steps:
1. Upload PDF
2. Enable both Header and Footer
3. Header Left: "Document Title"
4. Header Right: "{date}"
5. Footer Center: "Confidential"
6. Footer Right: "Page {page} of {total}"
7. Preview to verify
8. Apply & Download
```

---

## ⚡ Keyboard Shortcuts

Currently no keyboard shortcuts, but you can use:
- **Tab** - Navigate between fields
- **Enter** - Submit in text fields
- **Space** - Toggle checkboxes

---

## 📞 Need Help?

1. **Read this guide** - Most questions answered here
2. **Try the preview** - See results before applying
3. **Check examples** - Use provided configurations
4. **Review documentation** - See HEADER_FOOTER_TOOL.md

---

## ✅ Quick Checklist

Before downloading:
- [ ] PDF uploaded successfully
- [ ] Header/Footer enabled as needed
- [ ] Text entered in desired positions
- [ ] Variables used correctly ({page}, {total}, {date})
- [ ] Font size appropriate
- [ ] Color selected
- [ ] Margins adjusted
- [ ] Preview checked
- [ ] Multiple pages verified

---

## 🎉 Pro Tips

1. **Use {page} of {total}** for professional page numbering
2. **Center alignment** works best for document titles
3. **Right alignment** is standard for page numbers
4. **10pt font** is a good default size
5. **20px margins** prevent text from being too close to edges
6. **Preview first** to avoid re-processing
7. **Keep text short** for better appearance

---

*This is your quick reference for the Header & Footer PDF tool. Bookmark it!*

**Last Updated**: January 3, 2026
