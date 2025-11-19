"use client";

import { getAddress, PositionType } from "@/services/apiGeocoding";
import { getPosition } from "@/utils/helpers";
import { createContext, useCallback, useContext, useState } from "react";

type UserState = {
  username: string;
  status: "idle" | "loading" | "error";
  position: PositionType | null;
  address: string;
  error: string;
};

type UserContextType = UserState & {
  updateName: (name: string) => void;
  getUser: () => UserState;
  fetchAddress: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [position, setPosition] = useState<PositionType | null>(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const updateName = (name: string) => setUsername(name);

  const getUser = () => {
    return {
      username,
      status,
      position,
      address,
      error,
    };
  };

  const fetchAddress = useCallback(async () => {
    try {
      setStatus("loading");

      const positionObj = await getPosition();

      const pos = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      setPosition(pos);

      const addressObj = await getAddress(pos);

      const finalAddress = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName}`;

      setAddress(finalAddress);
      setStatus("idle");
      setError("");
    } catch (err) {
      setStatus("error");
      setError(
        "There was a problem getting your address. Make sure to fill this field",
      );
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        status,
        position,
        address,
        error,
        updateName,
        fetchAddress,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("User context cannot be used outside its provider");

  return context;
}
