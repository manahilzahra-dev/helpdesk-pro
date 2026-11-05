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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (decoded.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });

    const resolvedParams = await params;
    await Ticket.findByIdAndDelete(resolvedParams.id);
    return NextResponse.json({ message: "Ticket deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// PATCH: Ticket ka status aur rating update karne ke liye
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
    const resolvedParams = await params;
    const body = await req.json();

    // ✅ Agar request mein rating aayi hai, toh Admin check hatao (kyunki user rating de raha hoga)
    if (body.rating) {
       const updatedTicket = await Ticket.findByIdAndUpdate(resolvedParams.id, { rating: body.rating }, { new: true });
       return NextResponse.json(updatedTicket);
    }

    // ✅ Status change karne ke liye sirf Admin allowed hai
    if (decoded.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });

    const updatedTicket = await Ticket.findByIdAndUpdate(resolvedParams.id, { status: body.status }, { new: true });
    return NextResponse.json(updatedTicket);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}