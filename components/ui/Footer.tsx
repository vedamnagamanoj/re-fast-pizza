import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-stone-700 bg-stone-800 px-4 py-3 text-stone-300">
      <div className="w-full px-4">
        <div className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          {/* Left: Branding */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-500">
              🍕 Fast React Pizza Co.
            </span>
            <span className="hidden text-stone-500 sm:inline">•</span>
            <span className="text-stone-500">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Right: Links & Credit */}
          <div className="flex items-center gap-3 text-stone-400">
            <Link
              href="/menu"
              className="transition-colors hover:text-yellow-500"
            >
              Menu
            </Link>
            <span>•</span>
            <Link
              href="/cart"
              className="transition-colors hover:text-yellow-500"
            >
              Cart
            </Link>
            <span>•</span>
            <Link
              href="/order/new"
              className="transition-colors hover:text-yellow-500"
            >
              Order
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="https://deepmind.google/technologies/gemini/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden transition-colors hover:text-yellow-500 sm:inline"
            >
              Built with Antigravity
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
