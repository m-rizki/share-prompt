import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (request) => {
  try {
    await connectToDB()

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    const prompts = await Prompt.find({}).populate('creator')
    .skip(limit * (page - 1))
    .limit(limit)

    // Page 1 db.items.find().limit(10) // Page 2 db.items.find().skip(10).limit(10) // Page 3 db.items.find().skip(10).limit(10) etc..
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to load prompts', { status: 500 })
  }
}
