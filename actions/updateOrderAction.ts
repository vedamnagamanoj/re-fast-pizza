"use server";

import prisma from "@/lib/prisma";
import { getEstimatedDelivery } from "@/utils/helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Order } from "@/types";

export async function updateOrderAction(order: Order) {
  const totalItems = order.cartItems.reduce(
    (res: number, item: any) => res + item.quantity,
    0,
  );

  await prisma.order.update({
    where: { id: order.id },
    data: {
      priority: true,
      priorityPrice: order.orderPrice * 0.1,
      estimatedDelivery: getEstimatedDelivery(totalItems, true),
    },
  });

  // Refresh data on the page
  revalidatePath(`/order/${order.id}`);

  // Redirect or just stay – you choose
  // redirect(`/order/${orderId}`);
}
