import Link from "next/link"
import Image from "next/image"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
          <Link href="/" className="text-white text-2xl font-light tracking-wide hover:text-gray-300 transition-colors">
            Vaulted
          </Link>
        </div>

        <h1 className="text-3xl font-light mb-8 text-center">API Documentation</h1>

        <div className="space-y-12">
          <section className="border border-white p-6 rounded-none">
            <h2 className="text-xl font-light mb-4">Authentication</h2>
            <p className="text-gray-400 mb-4">Include your API key in the Authorization header as a Bearer token:</p>
            <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
              <code className="text-sm text-green-400">Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </section>

          <section className="border border-white p-6 rounded-none">
            <h2 className="text-xl font-light mb-4">Rate Limits</h2>
            <p className="text-gray-400">Each API key is limited to 1 request every 10 minutes.</p>
          </section>

          <section className="border border-white p-6 rounded-none">
            <h2 className="text-xl font-light mb-4">Upload Endpoint</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-2">
                  <strong className="text-white">POST</strong> https://vaulted.zone.id/api/v1/upload
                </p>
              </div>

              <div>
                <h3 className="text-lg font-light mb-2">Request Body</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`{
  "name": "Example Upload",
  "description": "Optional description",
  "url": "https://example.com/file"
}`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-light mb-2">Response</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`{
  "success": true,
  "message": "Upload saved successfully",
  "data": {
    "id": "uuid",
    "name": "Example Upload",
    "description": "Optional description",
    "url": "https://example.com/file",
    "created_at": "2024-01-01T00:00:00Z"
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section className="border border-white p-6 rounded-none">
            <h2 className="text-xl font-light mb-6">Code Examples</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-light mb-3 text-gray-300">Python</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`import requests

api_key = "YOUR_API_KEY"
url = "https://vaulted.zone.id/api/v1/upload"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "name": "My Upload",
    "description": "Example file",
    "url": "https://example.com/file.pdf"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3 text-gray-300">JavaScript (Node.js)</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`const apiKey = "YOUR_API_KEY";
const url = "https://vaulted.zone.id/api/v1/upload";

const data = {
  name: "My Upload",
  description: "Example file",
  url: "https://example.com/file.pdf"
};

fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3 text-gray-300">cURL</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`curl -X POST https://vaulted.zone.id/api/v1/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Upload",
    "description": "Example file",
    "url": "https://example.com/file.pdf"
  }'`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3 text-gray-300">PHP</h3>
                <pre className="bg-gray-900 p-4 overflow-x-auto border border-gray-700 rounded-none">
                  <code className="text-sm text-green-400">
                    {`<?php
$api_key = "YOUR_API_KEY";
$url = "https://vaulted.zone.id/api/v1/upload";

$data = [
    "name" => "My Upload",
    "description" => "Example file",
    "url" => "https://example.com/file.pdf"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $api_key,
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section className="border border-white p-6 rounded-none">
            <h2 className="text-xl font-light mb-4">Error Codes</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <strong className="text-white">401</strong> - Invalid or missing API key
              </li>
              <li>
                <strong className="text-white">429</strong> - Rate limit exceeded
              </li>
              <li>
                <strong className="text-white">400</strong> - Invalid request body
              </li>
              <li>
                <strong className="text-white">500</strong> - Internal server error
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
