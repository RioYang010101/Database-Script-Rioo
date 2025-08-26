import { connectDB, User } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET semua user
export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

// POST tambah user
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json(user);
}

// DELETE user
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
