import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        if (!token) {
            return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
        }

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return response;
    } catch (error) {
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

