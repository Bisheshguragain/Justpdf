import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function ContactPage() {
  return `
    ${Navbar()}
    <main class="max-w-2xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-green-700 mb-4">Contact JustPdf</h1>
      <p class="mb-4">Have questions, feedback, or need support? Reach out to us below.</p>
      <form class="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-lg mx-auto">
        <input type="text" name="name" placeholder="Your Name" class="border rounded px-3 py-2" required />
        <input type="email" name="email" placeholder="Your Email" class="border rounded px-3 py-2" required />
        <textarea name="message" placeholder="Your Message" class="border rounded px-3 py-2" rows="5" required></textarea>
        <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Send Message</button>
      </form>
      <p class="text-xs text-gray-500 mt-4">We respond to most inquiries within 24 hours.</p>
    </main>
    ${Footer()}
  `;
}
