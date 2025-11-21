"use client";

import { updateOrderAction } from "@/actions/updateOrderAction";
import { Order } from "@/types";

export default function UpdateOrder({ order }: { order: Order }) {
  return (
    <form action={updateOrderAction.bind(null, order)}>
      <button
        type="submit"
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Make Priority
      </button>
    </form>
  );
}
