import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient();

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ msg: "Please login first!" });
  }
  const data = await prisma.todo.findMany();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { todo } = body;
  if (!todo) {
    NextResponse.error();
  }
  const data = await prisma.todo.create({
    data: {
      todo,
    },
  });
  return NextResponse.json({
    msg: "Todo is created successfully!",
  });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, todo } = body;
  if (!id) {
    NextResponse.error();
  }
  const todoID = await prisma.todo.findFirst(id);
  if (!todoID) {
    return NextResponse.json({ msg: "Todo is not found" });
  }
  const data = await prisma.todo.update({
    where: { id },
    data: { todo },
  });
  return NextResponse.json({
    msg: "Todo is updated successfully!",
  });
}

export async function DELETE(request) {
  const body = await request.json();
  const { id } = body;
  if (!id) {
    return NextResponse.error();
  }
  const todoID = await prisma.todo.delete({ where: { id } });

  return NextResponse.json({
    msg: "Todo is updated successfully!",
  });
}
