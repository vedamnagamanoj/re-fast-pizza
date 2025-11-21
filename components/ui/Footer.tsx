function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-3 px-4 border-t border-stone-700 w-full">
      <div className="w-full px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          {/* Left: Branding */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-semibold">🍕 Fast React Pizza Co.</span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="text-stone-500">© {new Date().getFullYear()}</span>
          </div>

          {/* Right: Links & Credit */}
          <div className="flex items-center gap-3 text-stone-400">
            <a href="/menu" className="hover:text-yellow-500 transition-colors">
              Menu
            </a>
            <span>•</span>
            <a href="/cart" className="hover:text-yellow-500 transition-colors">
              Cart
            </a>
            <span>•</span>
            <a href="/order/new" className="hover:text-yellow-500 transition-colors">
              Order
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://deepmind.google/technologies/gemini/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-yellow-500 transition-colors"
            >
              Built with Antigravity
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
