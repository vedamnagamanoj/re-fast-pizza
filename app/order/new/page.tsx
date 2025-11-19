import CreateOrder from "@/components/CreateOrder";

function page() {
  return (
    <div className="mt-4">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <CreateOrder />
    </div>
  );
}

export default page;
