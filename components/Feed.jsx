'use client'

import { useState, useEffect, useCallback } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return data.map((item) => (
    <PromptCard key={item._id} prompt={item} handleTagClick={handleTagClick} />
  ))
}

const Feed = () => {
  const [searchtext, setSearchtext] = useState('')
  const [prompts, setPrompts] = useState([])
  const [showBtnShowMore, setShowBtnShowMore] = useState(true)
  const [showMore, setShowMore] = useState(true)
  const [page, setPage] = useState(1)

  const handleSearchChange = (e) => {}

  const fetchPrompts = useCallback(async () => {
    const params = {
      limit: 10,
      page: page,
    }
    const response = await fetch(
      `/api/prompt?page=${params.page}&limit=${params.limit}`
    )
    const data = await response.json()
    setPrompts((prev) => {
      const newPrompts = [...prev, ...data]
      if (prev.length === newPrompts.length) {
        setShowBtnShowMore(false)
        return prev
      }
      return newPrompts
    })

    setShowMore(false)
  }, [page])

  const handleShowMore = () => {
    setShowMore((prev) => !prev)
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchtext}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <div className='mt-16 prompt_layout'>
        <PromptCardList data={prompts} handleTagClick={() => {}} />
      </div>
      {showBtnShowMore ? (
        <button
          className='my-16 outline_btn'
          onClick={handleShowMore}
          disabled={showMore}
        >
          {showMore ? `Loading...` : `Load More`}
        </button>
      ) : (
        <p className='my-16'>No more prompt available</p>
      )}
    </section>
  )
}

export default Feed
