import { NextResponse } from 'next/server';
import { getUsers, saveUser } from '@/lib/auth-store';

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const users = getUsers();
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 } // Conflict
            );
        }

        // Create new user
        const newUser = {
            id: Math.random().toString(36).substring(7),
            username,
            email,
            password, // NOTE: In production, hash this password!
            createdAt: new Date().toISOString(),
        };

        const success = saveUser(newUser);

        if (!success) {
            return NextResponse.json(
                { message: "Failed to save user" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Account created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
