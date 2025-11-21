"use client";

import Link from "next/link";
import SearchOrder from "../order/SearchOrder";
import { useUser } from "@/context/UserContext";

function Header() {
  const { username } = useUser();

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link href="/" className="tracking-widest text-stone-800 font-semibold">
        Fast React Pizza Co.
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        {username && (
          <p className="hidden text-sm font-semibold tracking-wider italic md:block text-stone-800">
            {username}
          </p>
        )}
        <SearchOrder />
      </div>
    </header>
  );
}

export default Header;
