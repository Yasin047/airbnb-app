import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import "./globals.css";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};
const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  // const currentUser = await getUserProfile();
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <Navbar currentUser={session} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
