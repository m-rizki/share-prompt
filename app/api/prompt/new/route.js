import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json()

  try {
    // await connectToDB() -> lambda function, meaning it's going to die once it does its job
    // we have to do this everytime
    await connectToDB()

    const currentUserPrompts = await Prompt.find({ creator: userId }).populate('creator')
    
    if (currentUserPrompts.length === 5) {
      const errorResponse = {
        error: `You have reached the maximum limit of ${currentUserPrompts.length} posts.`,
      };
      return new Response(JSON.stringify(errorResponse), { status: 403 });
    }

    const newPrompt = new Prompt({ creator: userId, prompt, tag })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
