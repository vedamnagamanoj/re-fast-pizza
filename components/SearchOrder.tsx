"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    if (!orderId) return;

    setOrderId("");

    router.push(`/order/${orderId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
        value={orderId}
        onChange={(evnt) => setOrderId(evnt.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
