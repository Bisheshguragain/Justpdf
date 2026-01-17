// Drag-and-drop upload box component
export default function UploadBox({ onFile }) {
  return `
    <div id="upload-box" class="border-2 border-dashed border-green-400 rounded-lg p-8 bg-white flex flex-col items-center cursor-pointer hover:bg-green-50 transition">
      <svg class="w-12 h-12 text-green-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/></svg>
      <p class="text-gray-700 mb-2">Drag & drop your PDF here or <span class="text-green-700 underline">browse</span></p>
      <input type="file" accept="application/pdf" class="hidden" id="file-input" />
    </div>
  `;
}
