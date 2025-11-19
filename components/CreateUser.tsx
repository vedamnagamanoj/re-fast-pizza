"use client";

import { useUser } from "@/context/UserContext";
import { startTransition, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

function CreateUser() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const { updateName } = useUser();

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();
    if (!username) return;
    router.push("/menu");

    startTransition(() => {
      updateName(username);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(evnt) => setUsername(evnt.target.value)}
        className="tw-input mb-8 w-72"
      />
      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
