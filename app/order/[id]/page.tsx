import OrderItem from "@/components/OrderItem";
import UpdateOrder from "@/components/UpdateOrder";
import prisma from "@/lib/prisma";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/utils/helpers";

async function Page({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { cartItems: true },
  });

  if (!order) {
    return <div className="px-4 py-6">Order not found</div>;
  }

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cartItems: cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span
            className={`rounded-full ${status === "delivered" ? "bg-green-500" : "bg-orange-500"} px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50`}
          >
            Order {status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😊`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} ingredients={[]} key={item.id} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder orderId={orderId} />}
    </div>
  );
}

export default Page;
