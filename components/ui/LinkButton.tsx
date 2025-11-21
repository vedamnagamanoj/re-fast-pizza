"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LinkButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const styles = "hover:text-blue-600 text-sm text-blue-500";

  // go back
  if (to === "-1") {
    return (
      <button className={styles} onClick={() => router.back()}>
        {children}
      </button>
    );
  }

  // normal link
  return (
    <Link href={to} className={styles}>
      {children}
    </Link>
  );
}
