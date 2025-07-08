import { NextResponse } from "next/server";

export async function GET() {
    try {

        const response = NextResponse.json({
            msg: "user logged out!",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}