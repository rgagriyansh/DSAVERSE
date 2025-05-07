import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
})

export async function POST(req){
    const data = await req.json();
    const {message} = data;
    if(!message){
        return Response.json({ reply: "No input provided!" }, { status: 400 })
    }

    try{
        const chatResponse = await openai.chat.completions.create({
            messages:[
                { role: "system", content: "You are a helpful coding assistant." },
                { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.7
        })

        const reply = chatResponse.choices[0].message.content
        return Response.json({reply})
    }
    catch(err){
        console.log("openai error: ", err)
        return Response.json({ reply: "Something went wrong!" }, { status: 500 })
    }
}