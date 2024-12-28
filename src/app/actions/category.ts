"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function createCategory(data: { name: string; color?: string }) {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ createCategory ~ session:", session);

  if (!session) {
    throw new Error("Unauthorized");
  } else {
    return prisma.category.create({
      data: {
        ...data,
        user: { connect: { id: session.user.id } },
        createdAt: new Date(),
      },
    });
  }
}

export async function getCategories() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  } else {
    return prisma.category.findMany({
      where: { userId: session.user.id },
    });
  }
}

export async function updateCategory(id: number, name: string) {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
}

export async function deleteCategory(id: number) {
  return prisma.category.delete({
    where: { id },
  });
}
