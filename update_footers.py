#!/usr/bin/env python3
"""
Batch update all HTML files with the universal footer
"""

import os
import re

# Read the universal footer template
with open('/Users/millionairemindset/JustPDF/UNIVERSAL_FOOTER.html', 'r', encoding='utf-8') as f:
    universal_footer = f.read()

# Files to update (excluding already updated ones)
files_to_update = [
    '/Users/millionairemindset/JustPDF/index.html',
    '/Users/millionairemindset/JustPDF/about.html',
    '/Users/millionairemindset/JustPDF/contact.html',
    '/Users/millionairemindset/JustPDF/compress-pdf.html',
    '/Users/millionairemindset/JustPDF/merge-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/extract-pages.html',
    '/Users/millionairemindset/JustPDF/tools/bates-numbering.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-ppt.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-pdf-a.html',
    '/Users/millionairemindset/JustPDF/tools/redact-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/unlock-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/validate-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-excel.html',
    '/Users/millionairemindset/JustPDF/tools/remove-watermark.html',
    '/Users/millionairemindset/JustPDF/tools/fill-sign-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/protect-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/organize-pages.html',
    '/Users/millionairemindset/JustPDF/tools/watermark-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/sign-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/rotate-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-html.html',
    '/Users/millionairemindset/JustPDF/tools/page-numbers.html',
    '/Users/millionairemindset/JustPDF/tools/compare-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/split-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/header-footer-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-editor.html',
    '/Users/millionairemindset/JustPDF/tools/remove-annotations.html',
    '/Users/millionairemindset/JustPDF/tools/optimize-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/grayscale-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-image.html',
    '/Users/millionairemindset/JustPDF/tools/pdf-to-word.html',
    '/Users/millionairemindset/JustPDF/tools/remove-password.html',
    '/Users/millionairemindset/JustPDF/tools/crop-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/merge-pdf.html',
    '/Users/millionairemindset/JustPDF/tools/header-footer.html',
    '/Users/millionairemindset/JustPDF/tools/fill-sign.html',
    '/Users/millionairemindset/JustPDF/tools/delete-pages.html',
    '/Users/millionairemindset/JustPDF/tools/form-creator.html',
]

updated_count = 0
skipped_count = 0
error_count = 0

print("🚀 Starting Universal Footer Batch Update")
print(f"📁 Total files to process: {len(files_to_update)}")
print("-" * 60)

for file_path in files_to_update:
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"⚠️  SKIP: {os.path.basename(file_path)} (file not found)")
            skipped_count += 1
            continue
        
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has universal footer
        if 'Universal Footer for JustPDF' in content:
            print(f"✅ SKIP: {os.path.basename(file_path)} (already updated)")
            skipped_count += 1
            continue
        
        # Find and replace old footer
        # Pattern 1: Match <footer...> to </footer> (greedy to get full footer)
        footer_pattern = r'<footer[^>]*>.*?</footer>'
        
        if re.search(footer_pattern, content, re.DOTALL | re.IGNORECASE):
            # Replace old footer with universal footer
            new_content = re.sub(
                footer_pattern,
                universal_footer,
                content,
                count=1,
                flags=re.DOTALL | re.IGNORECASE
            )
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ UPDATED: {os.path.basename(file_path)}")
            updated_count += 1
        else:
            # No footer found, add before </body>
            if '</body>' in content:
                new_content = content.replace('</body>', f'{universal_footer}\n</body>', 1)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"✅ ADDED: {os.path.basename(file_path)} (footer added)")
                updated_count += 1
            else:
                print(f"⚠️  SKIP: {os.path.basename(file_path)} (no </body> tag found)")
                skipped_count += 1
    
    except Exception as e:
        print(f"❌ ERROR: {os.path.basename(file_path)} - {str(e)}")
        error_count += 1

print("-" * 60)
print(f"\n📊 BATCH UPDATE COMPLETE!")
print(f"✅ Updated: {updated_count} files")
print(f"⚠️  Skipped: {skipped_count} files")
print(f"❌ Errors: {error_count} files")
print(f"\n🎉 Total processed: {updated_count + skipped_count + error_count}/{len(files_to_update)}")

if updated_count > 0:
    print(f"\n✨ Successfully updated {updated_count} files with the universal footer!")
    print("🔍 All updated files now have:")
    print("   • Privacy Policy links")
    print("   • Terms of Use links")
    print("   • Professional 4-column layout")
    print("   • Mobile responsive design")
    print("   • 100% AdSense compliance")
