import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { toolCategories, getAllTools } from '../utils/toolRegistry.js';

// Homepage for JustPdf
export default function HomePage() {
  const allTools = getAllTools();
  
  return `
    ${Navbar()}
    <main class="max-w-6xl mx-auto px-4 py-10">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-green-700 mb-4">JustPdf – Free Online PDF Tools</h1>
        <p class="text-lg md:text-xl text-gray-700 mb-4">All-in-one PDF editor, converter, compressor, and more. 100% free, no logins, no limits.</p>
        <p class="text-md text-gray-600">Fast, secure, and private. Try our ${allTools.length}+ PDF tools below!</p>
      </div>
      
      ${Object.entries(toolCategories).map(([key, category]) => `
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">${category.name}</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${category.tools.map(tool => `
              <a href="/tools/${tool.slug}/" class="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200 hover:border-green-500">
                <h3 class="font-semibold text-green-700 mb-1">${tool.name}</h3>
                <p class="text-xs text-gray-600">${tool.description}</p>
              </a>
            `).join('')}
          </div>
        </section>
      `).join('')}
      
      <section class="mt-16 bg-green-50 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Why Choose JustPdf?</h2>
        <div class="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 class="font-semibold text-green-700 mb-2">🔒 100% Private & Secure</h3>
            <p class="text-sm">Your files are processed serverlessly and never stored. All processing happens in real-time with automatic cleanup.</p>
          </div>
          <div>
            <h3 class="font-semibold text-green-700 mb-2">⚡ Fast & Efficient</h3>
            <p class="text-sm">Our serverless architecture ensures lightning-fast processing with no queues or delays.</p>
          </div>
          <div>
            <h3 class="font-semibold text-green-700 mb-2">📱 Mobile-Friendly</h3>
            <p class="text-sm">Use all tools on any device – desktop, tablet, or smartphone. Fully responsive design.</p>
          </div>
          <div>
            <h3 class="font-semibold text-green-700 mb-2">🆓 Completely Free</h3>
            <p class="text-sm">No registration, no subscriptions, no hidden fees. All tools are free to use.</p>
          </div>
        </div>
      </section>
      
      <section class="mt-12 text-gray-600">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">About JustPdf.net</h2>
        <p class="mb-4">JustPdf.net is a comprehensive online PDF toolkit designed for individuals and professionals who need reliable, fast, and secure PDF processing. Whether you need to merge documents, compress files, convert formats, or edit PDFs, we've got you covered.</p>
        <p class="mb-4">Our platform is built on a 100% serverless architecture, ensuring your privacy and data security. We never store your files, and all processing is done in real-time with automatic cleanup. No registration or subscription required – just upload, process, and download.</p>
        <p>With over ${allTools.length} specialized tools, JustPdf.net is your one-stop solution for all PDF-related tasks. From simple conversions to advanced editing, we make PDF management effortless.</p>
      </section>
    </main>
    ${Footer()}
  `;
}
