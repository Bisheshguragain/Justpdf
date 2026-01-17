import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function PrivacyPolicyPage() {
  return `
    ${Navbar()}
    <main class="max-w-2xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-green-700 mb-4">Privacy Policy</h1>
      <p class="mb-4">Your privacy is important to us. JustPdf.net does not store your files, track your activity, or require registration. All processing is done serverlessly and statelessly. We use cookies and localStorage only for rate limiting and analytics.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul class="list-disc ml-6 mb-4">
        <li>No personal data is required to use our tools.</li>
        <li>We do not store uploaded files or processed documents.</li>
        <li>We use Google Analytics and AdSense for analytics and advertising.</li>
      </ul>
      <h2 class="text-xl font-semibold mt-8 mb-2">Cookies</h2>
      <p class="mb-4">We use cookies and localStorage for download rate limiting and analytics. You can clear these at any time in your browser settings.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>For privacy questions, please <a href="/contact/" class="text-green-700 underline">contact us</a>.</p>
    </main>
    ${Footer()}
  `;
}
