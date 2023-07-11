'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isLoggedIn = false
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='SharePrompt logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>SharePrompt</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {isLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>

            <button type='button' onClick={signOut} className='outlin_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={`/assets/images/logo.svg`}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {/* cannot see it because even though we're trying to fetch the providers they're not actualy there
                , we're going to do this later once we fully set up the next auth */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
