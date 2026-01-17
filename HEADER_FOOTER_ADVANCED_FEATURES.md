# 🎨 Header & Footer PDF Tool - Advanced Design Features

## Overview
This document details the advanced design features added to the Header & Footer PDF tool, enabling professional-grade styling and customization.

---

## ✨ Advanced Design Features

### 1. Font Weight Control

#### Description
Choose between normal and bold text for headers and footers.

#### Options
- **Normal** (default): Standard weight text
- **Bold**: Heavier weight for emphasis and visibility

#### Use Cases
- Make important information stand out
- Create professional document headers
- Emphasize page numbers or dates
- Match brand typography guidelines

#### Implementation
```javascript
Font Weight: [Normal ▼] or [Bold ▼]
```

---

### 2. Background Color & Opacity

#### Description
Add a colored background to the header or footer area with adjustable transparency.

#### Options
- **Enable/Disable**: Toggle checkbox to turn background on/off
- **Color Picker**: Choose any color using the color input
- **Opacity Slider**: Adjust transparency from 0% (invisible) to 100% (solid)

#### Use Cases
- Add subtle background highlights
- Create watermark-like effects
- Improve text readability on busy documents
- Match brand color schemes
- Create document sections visually

#### Implementation
```javascript
☑ Enable Background
Background Color: [#f0f0f0]
Opacity: [50%] ————————
```

#### Visual Effects
- **0-25% Opacity**: Very subtle tint
- **25-50% Opacity**: Light background, text clearly visible
- **50-75% Opacity**: Moderate background presence
- **75-100% Opacity**: Strong solid background

---

### 3. Border Line Styling

#### Description
Add decorative or separating lines to headers and footers with multiple style options.

#### Options
- **Enable/Disable**: Toggle checkbox to turn border on/off
- **Border Style**:
  - **Solid**: Continuous single line (professional, clean)
  - **Double**: Two parallel lines (formal, elegant)
  - **Dashed**: Segmented line pattern (modern, casual)
- **Border Width**: Line thickness from 1px (thin) to 5px (thick)
- **Border Color**: Color picker for line color

#### Use Cases
- Separate header/footer from document content
- Add visual polish and professionalism
- Match document formatting standards
- Create formal or legal document appearance
- Add decorative elements

#### Implementation
```javascript
☑ Enable Border
Border Style: [Solid ▼]
Border Width: [2] px
Border Color: [#333333]
```

#### Style Examples
- **Solid + 1px**: Subtle, minimal separation
- **Double + 1px**: Classic formal document style
- **Dashed + 2px**: Modern, casual appearance
- **Solid + 3-5px**: Strong visual emphasis

---

### 4. Text Alignment (Left Section)

#### Description
Control how text in the left position is aligned within its section.

#### Options
- **Left** (default): Align to the left edge
- **Center**: Center within the left third of the page
- **Right**: Align to the right within the left section

#### Use Cases
- Fine-tune text positioning
- Create balanced layouts
- Match existing document formatting
- Improve visual hierarchy

#### Implementation
```javascript
Left Align: [Left ▼] or [Center ▼] or [Right ▼]
```

#### Note
Center and right alignments in the footer section follow the same pattern.

---

### 5. Horizontal Padding

#### Description
Control the spacing between text and the page edges.

#### Options
- **Range**: 10px to 100px
- **Default**: 40px (comfortable spacing)

#### Use Cases
- Prevent text from appearing too close to edges
- Create more white space
- Match document margin requirements
- Improve readability on printed documents
- Create consistent spacing across pages

#### Implementation
```javascript
Padding: [40] px ————————
```

#### Spacing Guidelines
- **10-20px**: Minimal padding, maximizes content area
- **30-50px**: Standard comfortable spacing (recommended)
- **60-80px**: Generous spacing, formal appearance
- **90-100px**: Maximum spacing, wide margins

---

## 🎯 Feature Combinations

### Professional Business Document
```
Font Weight: Bold
Background: Enabled, #f8f9fa, 30% opacity
Border: Solid, 2px, #333333
Padding: 40px
```

### Formal Legal Document
```
Font Weight: Normal
Background: Disabled
Border: Double, 1px, #000000
Padding: 50px
```

### Modern Casual Style
```
Font Weight: Normal
Background: Enabled, #e3f2fd, 50% opacity
Border: Dashed, 2px, #2196f3
Padding: 30px
```

### Minimal Clean Style
```
Font Weight: Normal
Background: Disabled
Border: Solid, 1px, #cccccc
Padding: 40px
```

### Bold Emphasis Style
```
Font Weight: Bold
Background: Enabled, #fff3cd, 60% opacity
Border: Solid, 3px, #856404
Padding: 40px
```

---

## 📋 Quick Reference Guide

### Default Settings
- Font Weight: Normal
- Background: Disabled
- Border: Disabled
- Left Align: Left
- Padding: 40px

### Recommended Settings for Common Use Cases

#### 1. Standard Page Numbers
```
Header: Disabled
Footer: Enabled
  Right: "Page {page} of {total}"
  Font Weight: Normal
  Border: Solid, 1px
```

#### 2. Company Letterhead
```
Header: Enabled
  Left: "Company Name"
  Right: "{date}"
  Font Weight: Bold
  Background: Brand color, 20% opacity
  Border: Solid, 2px
```

#### 3. Confidential Documents
```
Header: Enabled
  Center: "CONFIDENTIAL"
  Font Weight: Bold
  Background: #ffcccc, 40% opacity
  Border: Double, 1px
```

#### 4. Legal Documents
```
Header & Footer: Enabled
  Border: Double, 1px, black
  Font Weight: Normal
  Padding: 60px
```

---

## 🔄 Live Preview Updates

All advanced features update the live preview in real-time:

1. **Font Weight**: Text immediately switches between normal and bold
2. **Background**: Color and opacity changes appear instantly
3. **Border**: Style, width, and color update live
4. **Alignment**: Text repositions dynamically
5. **Padding**: Spacing adjusts in real-time

This allows you to experiment and find the perfect styling before applying to your PDF.

---

## 📱 Cross-Browser Compatibility

All advanced features are fully supported in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers

---

## 🎓 Tips & Best Practices

### Font Weight
- Use **bold** for important information (page numbers, dates, titles)
- Use **normal** for supplementary information

### Background Color
- Keep opacity **below 50%** for subtle effects
- Use **brand colors** at low opacity for professional look
- Higher opacity works well with light text colors

### Border Lines
- **Solid 1-2px**: Most professional and versatile
- **Double 1px**: Classic formal document style
- **Dashed**: Use sparingly for modern designs

### Alignment
- **Left align** for most use cases
- **Center** for symmetrical layouts
- **Right align** for special positioning needs

### Padding
- **30-50px**: Standard professional spacing
- Increase for printed documents
- Match to document margins for consistency

---

## 🔧 Technical Notes

### PDF Generation
All advanced features are applied during PDF generation using pdf-lib:

- Font embedding: Helvetica and Helvetica-Bold
- Background: Drawn as rectangles with RGB color and opacity
- Borders: Drawn as lines with thickness and color
- Text: Positioned with precise calculations based on font metrics

### Performance
- No performance impact from advanced features
- All processing done client-side
- Instant preview updates
- Fast PDF generation (< 2 seconds for most files)

---

## 📝 Future Enhancements

Potential additions being considered:
- Custom font uploads
- Image/logo support in headers/footers
- Gradient backgrounds
- Multiple border styles per line
- Text shadow effects
- More alignment options
- Template presets
- Save/load custom configurations

---

## 📞 Support

For issues or questions about advanced features:
1. Check this documentation
2. Review the Quick Reference Guide
3. Experiment with live preview
4. Refer to HEADER_FOOTER_TOOL.md for basic features

---

**Last Updated**: January 2026  
**Tool Version**: 2.0 (with Advanced Design Features)
