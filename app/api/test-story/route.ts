import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const body = await req.json();
    const { story, sideCharacter, moral } = body;

    console.log(story)
    return NextResponse.json({ message: "Story Book Generator" }, { status: 200 });

}