export default function TosPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-white text-2xl font-light tracking-wide mb-8">terms of service</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          we're not responsible for any of the things posted here, nor the users who post them.
        </p>
        <a href="/" className="text-gray-500 text-sm hover:text-white transition-colors inline-block mt-8">
          ← back
        </a>
      </div>
    </main>
  )
}
