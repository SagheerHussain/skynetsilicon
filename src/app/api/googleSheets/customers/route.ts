import { NextResponse } from "next/server";
import { addCustomer, getCustomers } from "@/lib/googleSheets";

// POST handler: Add a customer to Google Sheets
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body); // Log request data

    const { name, email } = body;

    if (!name || !email) {
      console.error("Validation Error: Missing name or email");
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const uniqueId = `customer-${Date.now()}`;
    console.log(`Generated Unique ID: ${uniqueId}`);

    await addCustomer({ id: uniqueId, name, email });
    console.log("Customer added successfully to Google Sheets");

    return NextResponse.json(
      { message: "Customer added successfully!", id: uniqueId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /customers:", error.message);
    return NextResponse.json(
      { error: "Failed to add customer to Google Sheets." },
      { status: 500 }
    );
  }
}

// GET handler: Fetch customers from Google Sheets
export async function GET() {
  try {
    console.log("Fetching customers...");
    const customers = await getCustomers();
    console.log("Customers fetched successfully:", customers);

    return NextResponse.json(customers, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /customers:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch customers." },
      { status: 500 }
    );
  }
}
