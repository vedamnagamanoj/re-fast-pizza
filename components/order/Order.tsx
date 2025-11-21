import { Order as OrderType } from "@/types";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

function Order({ order }: { order: OrderType }) {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cartItems: cart,
  } = order;

  const deliveryIn = estimatedDelivery
    ? calcMinutesLeft(estimatedDelivery)
    : 0;

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
            ? `Fresh pizzas are baking their way to you 🔥 • ${deliveryIn} min left`
            : `Delivered! Hope you're enjoying your pizzas 😄`}
        </p>
        <p className="text-xs text-stone-500">
          {`${deliveryIn >= 0 ? "Estimated delivery: " : "Arrived around: "} ${estimatedDelivery ? formatDate(estimatedDelivery) : "N/A"}`}
        </p>
      </div>

      <ul className="max-h-[480px] divide-y divide-stone-200 overflow-y-auto border-y border-stone-200 px-2">
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
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export default Order;
