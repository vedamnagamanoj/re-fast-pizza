"use client";

import { useUser } from "@/context/UserContext";
import Button from "../ui/Button";
import CreateUser from "./CreateUser";

function UserInput() {
  const { username } = useUser();
  return (
    <>
      {username !== "" ? (
        <div>
          <p className="mb-2">Hi! {username},</p>
          <Button to="/menu" type="primary">
            Continue ordering
          </Button>
        </div>
      ) : (
        <CreateUser />
      )}
    </>
  );
}

export default UserInput;
