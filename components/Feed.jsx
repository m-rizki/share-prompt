'use client'

import { useState, useEffect, useCallback } from 'react'
import PromptCard from './PromptCard'
import { debounce } from '@utils/helpers/debounce'

const PromptCardList = ({ data, handleTagClick }) => {
  return data.map((item) => (
    <PromptCard key={item._id} prompt={item} handleTagClick={handleTagClick} />
  ))
}

const Feed = () => {
  // search states
  const [searchText, setSearchText] = useState('')

  const [prompts, setPrompts] = useState([])
  const [showBtnShowMore, setShowBtnShowMore] = useState(true)
  const [showMore, setShowMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchPrompts = useCallback(async () => {
    const params = {
      limit: 10,
      page: page,
      searchText: searchText,
    }
    const response = await fetch(
      `/api/prompt?page=${params.page}&limit=${
        params.limit
      }&search=${encodeURIComponent(params.searchText)}`
    )

    if (response.ok) {
      const data = await response.json()
      setPrompts((prev) => {
        if (data.length === 0) {
          setShowBtnShowMore(false)
          return prev
        }
        const newPrompts = [...prev, ...data]
        setShowBtnShowMore(true)
        return newPrompts
      })
    }

    if (response.status === 404) {
      setShowBtnShowMore(false)
    }

    setShowMore(false)
  }, [page, searchText])

  const handleShowMore = () => {
    setShowMore((prev) => !prev)
    setPage((prev) => prev + 1)
  }

  const handleTagClick = (tagName) => {
    alert(`tag: #${tagName}`)
  }

  const handleSearchChange = useCallback(
    debounce((value) => setSearchText(value), 300),
    []
  )

  useEffect(() => {
    setPrompts([])
    setShowBtnShowMore(true)
    setShowMore(true)
    setPage(1)
  }, [searchText])

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className='search_input peer'
        />
      </form>

      <div className='mt-16 prompt_layout'>
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
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
