import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import UploadBox from '../components/UploadBox.js';
import ProgressBar from '../components/ProgressBar.js';
import DownloadButton from '../components/DownloadButton.js';
import RelatedTools from '../components/RelatedTools.js';
import AdSense from '../components/AdSense.js';
import { canDownload, recordDownload } from '../utils/rateLimit.js';
import { validatePDF } from '../utils/fileValidation.js';

// Merge PDF tool page (example)
export default function MergePdfPage() {
  return `
    ${Navbar()}
    <main class="max-w-2xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-green-700 mb-4">Merge PDF Files</h1>
      <p class="mb-4">Combine multiple PDF files into a single document. Fast, secure, and free. No registration required.</p>
      <div id="merge-upload">
        ${UploadBox({ onFile: 'handleMergeFiles' })}
      </div>
      <div id="progress"></div>
      <div id="download"></div>
      <section class="mt-10 text-gray-600 text-sm">
        <h2 class="text-xl font-semibold mb-2">How to Merge PDFs Online</h2>
        <ol class="list-decimal ml-6 mb-4">
          <li>Upload two or more PDF files using the box above.</li>
          <li>Click the Merge button.</li>
          <li>Download your combined PDF instantly.</li>
        </ol>
        <h3 class="text-lg font-semibold mt-6 mb-2">Why Use JustPdf to Merge PDFs?</h3>
        <ul class="list-disc ml-6 mb-4">
          <li>100% serverless and stateless – your files are never stored</li>
          <li>No registration, no subscriptions, no limits</li>
          <li>Fast, secure, and mobile-friendly</li>
        </ul>
        <h3 class="text-lg font-semibold mt-6 mb-2">FAQ</h3>
        <div itemscope itemtype="https://schema.org/FAQPage">
          <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
            <h4 itemprop="name">Is it safe to merge PDFs on JustPdf?</h4>
            <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <p itemprop="text">Yes. All processing is done serverlessly and statelessly. Your files are never stored or shared.</p>
            </div>
          </div>
          <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
            <h4 itemprop="name">Are there any limits?</h4>
            <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <p itemprop="text">You can merge up to 3 files per 24 hours for free. No registration required.</p>
            </div>
          </div>
        </div>
      </section>
      ${RelatedTools({ tools: [
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'PDF Editor', slug: 'pdf-editor' }
      ] })}
      ${AdSense()}
    </main>
    ${Footer()}
  `;
}
