import Cart from "@/components/Cart";
import CartButtons from "@/components/CartButtons";
import LinkButton from "@/components/LinkButton";

function Page() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <Cart />
      <div className="mt-6 space-x-6">
        <CartButtons />
      </div>
    </div>
  );
}

export default Page;
