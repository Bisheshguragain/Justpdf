// AdSense placeholder component
export default function AdSense() {
  return `
    <div class="mt-10 flex justify-center">
      <!-- Google AdSense Placeholder -->
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  `;
}
