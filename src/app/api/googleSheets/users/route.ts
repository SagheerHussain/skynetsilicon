import { NextResponse } from "next/server";
import { addUser, getUsers } from "@/lib/googleSheets";

// Handle GET requests to fetch users
export async function GET() {
  try {
    const users = await getUsers();
    console.log("Fetched users from Google Sheets:", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /users:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch users from Google Sheets." },
      { status: 500 }
    );
  }
}

// Handle POST requests to add a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming POST request body:", body);

    const { name, email } = body;

    if (!name || !email) {
      console.error("Validation Error: Missing name or email");
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const uniqueId = `user-${Date.now()}`;
    console.log(`Generated Unique ID: ${uniqueId}`);

    await addUser({ id: uniqueId, name, email });
    console.log("User added successfully to Google Sheets");

    return NextResponse.json(
      { message: "User added successfully!", id: uniqueId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /users:", error.message);
    return NextResponse.json(
      { error: "Failed to add user to Google Sheets." },
      { status: 500 }
    );
  }
}
