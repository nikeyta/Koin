'use client'
import { useState } from "react"
import { checkUser } from "../lib/checkUser"
import Link from "next/link"
import ThemeBtn from "./ThemeBtn"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Navbar=()=>{
    // const user = checkUser()
    const [mobilemenu, setmobilemenu] = useState(true)
    const togglemobilemenu = ()=>{
        setmobilemenu(!mobilemenu)
    }
    const closemobilemenu = ()=>{
        setmobilemenu(false)
    }
  return (
    <div>
      <div>
        <Link href='/'>
        logo
        </Link>
      </div>
      <div>
       <Link href='/'> <span>Home</span>
       </Link> 
       <Link href='/about'><span>About</span></Link> 
       <Link href='/contact'> <span>Contact</span></Link>
      </div>
      <div>
        <ThemeBtn />
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <span>sign in</span>
          </SignInButton>
        </SignedOut>

        <SignedIn>
         <UserButton
         appearance={{
                      elements: {
                        avatarBox:
                          'w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200',
                        userButtonBox: 'flex items-center justify-center',
                      },
                    }}
         />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
