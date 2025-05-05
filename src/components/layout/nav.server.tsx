import Link from "next/link";
import React from "react";
import NavLink from "./nav-link.client";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 py-4 bg-primary-foreground  flex justify-center z-40 mx-auto shadow-md`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold ">
              Friend AI
            </Link>
          </div>
          <NavLink />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
