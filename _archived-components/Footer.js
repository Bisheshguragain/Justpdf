// Footer component for JustPdf
export default function Footer() {
  return `
    <footer class="bg-gray-50 border-t mt-12 py-8 text-center text-sm text-gray-500">
      <div class="mb-2">
        <a href="/about/" class="mx-2 hover:text-green-700">About</a>|
        <a href="/contact/" class="mx-2 hover:text-green-700">Contact</a>|
        <a href="/privacy-policy/" class="mx-2 hover:text-green-700">Privacy Policy</a>|
        <a href="/terms-of-use/" class="mx-2 hover:text-green-700">Terms of Use</a>
      </div>
      <div>© 2026 JustPdf.net. All rights reserved.</div>
    </footer>
  `;
}
