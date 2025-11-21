import CartOverview from "@/components/cart/CartOverview";
import MenuItem from "@/components/menu/MenuItem";

import { PizzaType } from "@/types";

import prisma from "@/lib/prisma";

async function Page() {
  const menu = await prisma.item.findMany();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: PizzaType) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Page;
