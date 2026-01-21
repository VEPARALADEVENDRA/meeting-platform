import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/auth-store';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { message: "Missing username or password" },
                { status: 400 }
            );
        }

        // Validate user
        const users = getUsers();
        // Finding by username, as per the frontend input "placeholder='User Name'"
        // If frontend sends email as username, this logic holds if user registered with email as username.
        // Assuming 'username' field matches. 
        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid username or password" },
                { status: 401 } // Unauthorized
            );
        }

        return NextResponse.json(
            { message: "Login successful", user: { username: user.username, email: user.email } },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
