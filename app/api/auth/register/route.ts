import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const newUser = await User.create(
            {
                name,
                email,
                password,
            }
        );
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        if (!token) {
            return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
        }

        const response = NextResponse.json({
            message: "User registered successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}