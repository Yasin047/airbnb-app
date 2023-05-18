"use client";
import { signIn, signOut } from "next-auth/react";

const Navbar = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      {currentUser?.name}
      <div>{currentUser?.email}</div>
      <div>{currentUser?.role}</div>
      <div>
        {currentUser && (
          <>
            <img
              className="w-16 h-16 rounded-full"
              src={currentUser?.image}
              alt=""
            />
          </>
        )}
      </div>
      <div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <div>
        <button onClick={() => signIn("github")}>sign in with github</button>
      </div>
      <div>
        <button onClick={() => signIn("google")}>sign in with google</button>
      </div>
    </div>
  );
};

export default Navbar;
