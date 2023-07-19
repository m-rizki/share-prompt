'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  // console.log(params)
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')

  const [userPrompts, setUserPrompts] = useState([])

  const fetchPrompts = useCallback(async () => {
    const response = await fetch(`/api/users/${params?.id}/prompts`)
    const data = await response.json()

    setUserPrompts(data)
  }, [params.id])

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return (
    <Profile
      data={userPrompts}
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
    />
  )
}

export default UserProfile
