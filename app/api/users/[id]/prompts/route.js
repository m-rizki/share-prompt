import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    // params.id
    const prompts = await Prompt.find({ creatot: params.id }).populate(
      'creator'
    )
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (e) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}