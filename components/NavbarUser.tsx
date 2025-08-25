"use client";
import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import FlipLink from "@/components/ui/text-effect-flipper";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav
      className="w-full absolute top-0 z-50 
      backdrop-blur-lg backdrop-saturate-150 
      border-b border-white/20 dark:border-emerald-900/40 
      shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-3xl font-extrabold text-emerald-700 dark:text-[#FFEAEA]">
          <FlipLink href="/">KOIN</FlipLink>
        </div>

        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/">
            <span className="text-emerald-700 dark:text-[#FFEAEA]">Home</span>
          </Link>
          <SignedOut>
            <Link href="/#about&contact">
              <span className="text-emerald-700 dark:text-[#FFEAEA]">About</span>
            </Link>
          </SignedOut>
          <Link href="/#about&contact">
            <span className="text-emerald-700 dark:text-[#FFEAEA]">Contact</span>
          </Link>
          <SignedIn>
            <Link href="/#expenses">
              <span className="text-emerald-700 dark:text-[#FFEAEA]">All Expenses</span>
            </Link>
          </SignedIn>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeBtn />

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-md border dark:border-emerald-900/40 border-emerald-200">
                <Menu className="w-6 h-6 text-emerald-700 dark:text-[#FFEAEA]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white dark:bg-emerald-950">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <SignedOut>
                  <DropdownMenuItem asChild>
                    <Link href="/#about&contact">About</Link>
                  </DropdownMenuItem>
                </SignedOut>
                <DropdownMenuItem asChild>
                  <Link href="/#about&contact">Contact</Link>
                </DropdownMenuItem>
                <SignedIn>
                  <DropdownMenuItem asChild>
                    <Link href="/#expenses">All Expenses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>
                      <span>Logout</span>
                    </SignOutButton>
                  </DropdownMenuItem>
                </SignedIn>
                <SignedOut>
                  <DropdownMenuItem>
                    <SignInButton mode="modal">
                      <span>Sign In</span>
                    </SignInButton>
                  </DropdownMenuItem>
                </SignedOut>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <span className="px-4 py-1.5 border rounded-lg text-emerald-700 dark:text-[#FFEAEA] transition">
                  Sign In
                </span>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-1.5 border rounded-lg text-emerald-700 dark:text-[#FFEAEA]">
                  Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white dark:bg-emerald-950">
                  <DropdownMenuItem asChild>
                    <Link href="/#expenses">All Expenses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>
                      <span>Logout</span>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
