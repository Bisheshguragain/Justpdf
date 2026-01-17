import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function TermsOfUsePage() {
  return `
    ${Navbar()}
    <main class="max-w-2xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-green-700 mb-4">Terms of Use</h1>
      <p class="mb-4">By using JustPdf.net, you agree to our terms. All tools are provided as-is, without warranty. You are responsible for the content you upload and process. We do not store your files or personal data.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Acceptable Use</h2>
      <ul class="list-disc ml-6 mb-4">
        <li>Do not use our tools for illegal or harmful purposes.</li>
        <li>Respect copyright and intellectual property laws.</li>
        <li>Do not attempt to abuse or circumvent rate limits.</li>
      </ul>
      <h2 class="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
      <p class="mb-4">We are not liable for any damages resulting from the use of our tools. Use at your own risk.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>For questions, please <a href="/contact/" class="text-green-700 underline">contact us</a>.</p>
    </main>
    ${Footer()}
  `;
}
