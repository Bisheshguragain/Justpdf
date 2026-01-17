// Progress indicator component
export default function ProgressBar({ progress }) {
  return `
    <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
      <div class="bg-green-500 h-3 rounded-full transition-all" style="width: ${progress}%;"></div>
    </div>
  `;
}
