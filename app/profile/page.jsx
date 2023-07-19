'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [prompts, setPrompts] = useState([])

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`)
  }
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        })

        // ensure list of prompt is not included deleted prompt
        const filteredPrompt = prompts.filter((p) => {
          p._id !== prompt._id
        })

        setPrompts(filteredPrompt)
      } catch (error) {
        console.log(error)
      } finally {
        router.refresh()
        fetchPrompts()
      }
    }
  }

  const fetchPrompts = useCallback(async () => {
    // console.log('running') // running 2x because session is change
    if (session) {
      const response = await fetch(`/api/users/${session.user.id}/prompts`)
      const data = await response.json()
      setPrompts(data)
    }
  }, [session])

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
