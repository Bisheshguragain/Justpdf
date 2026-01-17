// Related tools section component
export default function RelatedTools({ tools }) {
  return `
    <div class="mt-10">
      <h3 class="text-lg font-semibold mb-2 text-gray-700">Related Tools</h3>
      <div class="flex flex-wrap gap-3">
        ${tools.map(tool => `<a href="/${tool.slug}/" class="px-4 py-2 bg-gray-100 rounded hover:bg-green-100 text-green-700">${tool.name}</a>`).join('')}
      </div>
    </div>
  `;
}
