// Download button component
export default function DownloadButton({ url, disabled }) {
  return `
    <a href="${url}" download class="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition ${disabled ? 'opacity-50 pointer-events-none' : ''}">
      Download PDF
    </a>
  `;
}
