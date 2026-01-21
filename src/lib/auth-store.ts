
import fs from 'fs';
import path from 'path';

// Path to store users.json at project root or data folder
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Interface for User
export interface User {
    id: string;
    username: string;
    email: string;
    password: string; // Storing plain text for this demo/debug request, SHOULD be hashed in prod
    createdAt: string;
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper: Read Users
export const getUsers = (): User[] => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
};

// Helper: Save User
export const saveUser = (user: User): boolean => {
    try {
        const users = getUsers();
        // Check duplication (redundant safety)
        if (users.some(u => u.email === user.email)) {
            return false;
        }
        users.push(user);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error("Error saving user:", error);
        return false;
    }
};

// Helper: Find User
export const findUserByEmail = (email: string): User | undefined => {
    const users = getUsers();
    return users.find(u => u.email === email);
};
