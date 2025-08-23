'use client'
import Link from "next/link"
import ThemeBtn from "./ThemeBtn"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import FlipLink from "@/components/ui/text-effect-flipper"

const Navbar = () => {
  return (
    <nav className="w-full bg-[#05241d] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold  text-[#FFEAEA]">
          <FlipLink href="/" >KOIN</FlipLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/">
            <span className="text-[#FFEAEA]  ">
              Home
            </span>
          </Link>
          <Link href="/#about">
            <span className="text-[#FFEAEA]  ">
              About
            </span>
          </Link>
          <Link href="/#contact">
            <span className="text-[#FFEAEA]  ">
              Contact
            </span>
          </Link>
        </div>

        {/* Right Side (Theme + Auth) */}
        <div className="flex items-center space-x-4">
          <ThemeBtn />

          
       <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'w-8 h-8 hover:scale-110 transition-transform duration-200',
                  userButtonBox: 'flex items-center justify-center',
                },
              }}
            />
          </SignedIn>
         <SignedOut>
            <SignInButton mode="modal">
              <span className="px-4 py-2 border rounded-lg text-[#FFEAEA]  transition">
                Sign In
              </span>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}

export default Navbar




//  <SignedOut>
//             <SignInButton>
//               <span className="px-4 py-2 text-sm border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
//                 Sign In
//               </span>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox:
//                     'w-8 h-8 hover:scale-110 transition-transform duration-200',
//                   userButtonBox: 'flex items-center justify-center',
//                 },
//               }}
//             />
//           </SignedIn>