import { Nunito } from "next/font/google";
import getUserProfile from "./actions/userProfile";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import "./globals.css";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};
const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const currentUser = await getUserProfile();
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <Navbar currentUser={currentUser} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
