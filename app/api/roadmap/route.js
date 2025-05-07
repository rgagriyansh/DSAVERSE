import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
  try {
    const body = await req.json()
    const { goal, skills } = body

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    console.log("Session:", session)
    console.log("Raw userId from session:", userId)

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userIdInt = parseInt(userId)
    if (isNaN(userIdInt)) {
      console.error("Invalid userId (not a number):", userId)
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const prompt = `Generate a roadmap (5–8 steps) for a person whose goal is ${goal} and skills are ${skills}. Return the roadmap as a list.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    const rawText = completion.choices[0]?.message?.content || ''
    console.log("GPT Raw Response:", rawText)

    const roadmapSteps = rawText
      .replace(/^\[|\]$/g, '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)

    console.log("Parsed Steps:", roadmapSteps)

    const savedRoadmap = await prisma.roadmap.create({
      data: {
        userId: userIdInt,
        goal,
        skills,
        steps: JSON.stringify(roadmapSteps),
      },
    })

    console.log("Saved to DB:", savedRoadmap)

    return NextResponse.json({ roadmap: roadmapSteps })
  } catch (err) {
    console.error('GPT/DB Error:', err)
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 })
  }
}
