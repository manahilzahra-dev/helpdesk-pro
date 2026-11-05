import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// ✅ Type define kiya hai
interface DecodedToken {
  userId: string;
  role: string;
}

export async function GET() {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ 'any' ki jagah DecodedToken use kiya
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
    const query = decoded.role === "admin" ? {} : { createdBy: decoded.userId };
    const tickets = await Ticket.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(tickets);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   await dbConnect();
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
//     const body = await req.json();

//     const newTicket = await Ticket.create({ ...body, createdBy: decoded.userId });
//     return NextResponse.json(newTicket, { status: 201 });
//   } catch {
//     return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    console.log("🔍 Decoded Token:", decoded); // ✅ Yeh add karein

    const body = await req.json();
    console.log("📦 Body Data:", body); // ✅ Yeh add karein

    const newTicket = await Ticket.create({ ...body, createdBy: decoded.userId });
    console.log("✅ Saved Ticket:", newTicket); // ✅ Yeh add karein

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("❌ Error:", error); // ✅ Error print karwayein
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}