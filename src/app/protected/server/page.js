import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/?callbackUrl=/protected/server");
  }
  if (session?.user?.role !== "ADMIN") {
    return <div>You are not authorize</div>;
  }
  return <div>ADMIN PAGE</div>;
};

export default page;
