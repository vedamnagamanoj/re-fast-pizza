"use server";

import prisma from "@/lib/prisma";
import { getEstimatedDelivery } from "@/utils/helpers";
import { redirect } from "next/navigation";

export async function createOrderAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries()) as {
    customer: string;
    address: string;
    cart: string;
    priority?: string;
    position?: string;
  };

  const cart = JSON.parse(data.cart);
  const orderPrice = cart.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0,
  );

  const totalItems = cart.reduce(
    (res: number, item: any) => res + item.quantity,
    0,
  );

  const estimatedDelivery = getEstimatedDelivery(totalItems);

  const newOrder = await prisma.$transaction(async (tx) => {
    // Step 1: Create Order
    const order = await tx.order.create({
      data: {
        customer: data.customer,
        status: "preparing",
        priority: data.priority === "on",
        address: data.address,
        position: data.position || null,
        estimatedDelivery,
        orderPrice,
        priorityPrice: data.priority === "on" ? 0.1 * orderPrice : 0,
      },
    });

    // Step 2: Create CartItems
    await tx.cartItem.createMany({
      data: cart.map((item: any) => {
        return {
          itemId: Number(item.id),
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          orderId: order.id,
        };
      }),
    });

    return order;
  });

  redirect(`/order/${newOrder.id}`);
}
