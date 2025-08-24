"use client";
import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import FlipLink from "@/components/ui/text-effect-flipper";

const Navbar = () => {
  return (
    <nav className=" w-full absolute top-0 z-50 
  backdrop-blur-lg backdrop-saturate-150 
  border-b border-white/20 dark:border-emerald-900/40 
  shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-3xl font-extrabold  text-emerald-700  dark:text-[#FFEAEA]">
          <FlipLink href="/">KOIN</FlipLink>
        </div>

        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/">
            <span className="text-emerald-700 dark:text-[#FFEAEA]  ">Home</span>
          </Link>
          <SignedOut>
            <Link href="/#about&contact">
              <span className="text-emerald-700 dark:text-[#FFEAEA]  ">About</span>
            </Link>
          </SignedOut>
          <Link href="/#about&contact">
            <span className="text-emerald-700 dark:text-[#FFEAEA]  ">Contact</span>
          </Link>
           <SignedIn>
          <Link href="/#expenses">
            <span className="text-emerald-700 dark:text-[#FFEAEA] ">All Expenses</span>
          </Link>
        </SignedIn>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeBtn />

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 hover:scale-110 transition-transform duration-200",
                  userButtonBox: "flex items-center justify-center",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <span className="px-4 py-1.5 border rounded-lg text-emerald-700 dark:text-[#FFEAEA]  transition">
                Sign In
              </span>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
