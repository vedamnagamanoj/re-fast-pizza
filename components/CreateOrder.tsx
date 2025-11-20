"use client";

import { createOrderAction } from "@/actions/createOrderAction";
import Button from "@/components/Button";
import EmptyCart from "@/components/EmptyCart";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { cart, getTotalPizzaCost } = useCart();
  const { getUser } = useUser();

  const { username, status: addressStatus, position, address } = getUser();

  const totalCartPrice = getTotalPizzaCost();

  const isLoadingAddress = addressStatus === "loading";

  const priorityPrice = withPriority ? totalCartPrice * 0.1 : 0;
  const billAmount = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mt-4">
      <form action={createOrderAction}>
        {/* CUSTOMER */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="tw-input grow"
          />
        </div>

        {/* PHONE */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="tw-input w-full"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              className="tw-input w-full"
              defaultValue={address}
            />
          </div>

          {/* <span className="absolute top-[3px] right-[3px] md:top-[5px] md:right-[5px]">
            {!position?.latitude && !position?.longitude && (
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(evnt) => {
                  evnt.preventDefault();
                  fetchAddress();
                }}
              >
                Get Address
              </Button>
            )}
          </span> */}
        </div>

        {/* PRIORITY CHECKBOX */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring-yellow-400"
            defaultChecked={withPriority}
            onChange={(evnt) => setWithPriority(evnt.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        {/* HIDDEN FIELDS */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position?.longitude && position?.latitude
              ? `${position?.latitude},${position?.longitude}`
              : ""
          }
        />

        {/* SUBMIT BUTTON */}
        <SubmitButton isLoading={isLoadingAddress} billAmount={billAmount} />
      </form>
    </div>
  );
}

function SubmitButton({
  isLoading,
  billAmount,
}: {
  isLoading: boolean;
  billAmount: number;
}) {
  return (
    <Button disabled={isLoading} type="primary">
      {isLoading
        ? "Placing order..."
        : `Order now for ${formatCurrency(billAmount)}`}
    </Button>
  );
}
