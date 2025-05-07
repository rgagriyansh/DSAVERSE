import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // Importing the default export from prisma.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Convert userId to integer (if it's a string)
  const userIdInt = parseInt(userId, 10)

  // Check if the conversion was successful
  if (isNaN(userIdInt)) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
  }

  // Now use userIdInt in the query
  const latest = await prisma.roadmap.findFirst({
    where: { userId: userIdInt },  // Make sure userId is an integer
    orderBy: { createdAt: 'desc' },
  })

  if (!latest) {
    return NextResponse.json({ preview: [] })
  }

  const steps = JSON.parse(latest.steps || '[]')  // Parsing JSON from database
  const preview = steps.slice(0, 3)  // Get the first 3 steps

  return NextResponse.json({ preview })
}
