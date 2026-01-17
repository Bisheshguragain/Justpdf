// Navbar component for JustPdf
export default function Navbar() {
  return `
    <nav class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <a href="/" class="flex items-center">
        <img src="/public/logo.png" alt="JustPdf Logo" class="h-8 w-8 mr-2" />
        <span class="font-bold text-xl text-green-700">JustPdf</span>
      </a>
      <ul class="flex space-x-6 text-gray-700 text-base">
        <li><a href="/all-tools/" class="hover:text-green-700">All Tools</a></li>
        <li><a href="/about/" class="hover:text-green-700">About</a></li>
        <li><a href="/contact/" class="hover:text-green-700">Contact</a></li>
      </ul>
    </nav>
  `;
}
