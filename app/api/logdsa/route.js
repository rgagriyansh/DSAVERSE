// app/api/logdsa/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {authOptions} from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();
  const { date, questionsSolved, platform, selectedTopics } = body;
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const newLog = await prisma.dsalog.create({
      data: {
        userId: parseInt(session.user.id),
        date: new Date(date),
        questionsSolved: parseInt(questionsSolved),
        platform,
        topics: selectedTopics,
      },
    });
    return NextResponse.json(newLog);
  } catch (err) {
    console.error("Error logging DSA progress:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req){
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId =  await session.user.userId;
  const today = new Date();
  const sevendaysbefore = new Date();
  sevendaysbefore.setDate(today.getDate()-6);

  const logs = await prisma.dsalog.findMany({
    where:{
      userId,
      date:{
        gte: sevendaysbefore,
        lte: today,
      },
    },
    orderBy:{
      date: 'asc'
    }
  });

  const result = Array(7).fill(0);
  const labels = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });

  logs.forEach(entry => {
    const index = labels.findIndex(
      label => new Date(entry.date).toDateString() === label
    );
    if (index !== -1) {
      result[index] += entry.questionsSolved;
    }
  });
  return NextResponse.json({ labels, data: result });
}
