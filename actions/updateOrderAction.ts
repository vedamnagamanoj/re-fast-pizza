"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateOrderAction(orderId: number) {
  await prisma.order.update({
    where: { id: orderId },
    data: { priority: true },
  });

  // Refresh data on the page
  revalidatePath(`/order/${orderId}`);

  // Redirect or just stay – you choose
  // redirect(`/order/${orderId}`);
}
