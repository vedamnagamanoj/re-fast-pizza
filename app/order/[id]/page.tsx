import Order from "@/components/order/Order";
import prisma from "@/lib/prisma";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramsId } = await params;

  const orderId = Number(paramsId);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { cartItems: true },
  });

  if (!order) {
    return <div className="px-4 py-6">Order not found</div>;
  }

  const now = new Date();
  const shouldBeDelivered =
    order.estimatedDelivery && order.estimatedDelivery <= now;

  if (shouldBeDelivered && order.status !== "delivered") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "delivered" },
    });

    // Re-fetch updated order

    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { cartItems: true },
    });

    if (!updatedOrder) return null;

    return <Order order={updatedOrder} />;
  }

  return <Order order={order} />;
}

export default Page;
