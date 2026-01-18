import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function AboutPage() {
  return `
    ${Navbar()}
    <main class="max-w-2xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-green-700 mb-4">About JustPdf</h1>
      <p class="mb-4">JustPdf.net is a modern, serverless platform offering free, fast, and secure PDF tools. Our mission is to make working with PDFs effortless for everyone, everywhere. We never store your files, require no registration, and are committed to privacy and simplicity.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Our Vision</h2>
      <p class="mb-4">To be the world’s most trusted, user-friendly, and accessible PDF toolkit. We believe in open access, privacy, and a seamless user experience.</p>
      <h2 class="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>For support or feedback, please visit our <a href="/contact/" class="text-green-700 underline">Contact page</a>.</p>
    </main>
    ${Footer()}
  `;
}
