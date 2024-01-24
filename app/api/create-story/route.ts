import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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', // Replace with your OpenAI API key
});

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { story, sideCharacter, moral } = body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a teller of tales." },
                { role: "user", content: `Write a story about ${story} with side charaters ${sideCharacter} and moral of story as ${moral}.` }
            ],
        });

        console.log(completion.choices[0]);

        return NextResponse.json(completion, { status: 200 });

    } catch (error) {

        console.log("STORY GENERATOR ISSUE")
        return new NextResponse("internal Server Error", { status: 500 })
    }
}

export async function GET() {

    return NextResponse.json({ message: "Story Book Generator" }, { status: 200 });
} 