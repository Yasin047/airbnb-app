"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/?callbackUrl=/protected/client");
    },
  });
  if (session?.data?.user?.role !== "ADMIN") {
    return <div>You are not authorize</div>;
  }
  return <div>ADMIN PAGE</div>;
};

export default page;
