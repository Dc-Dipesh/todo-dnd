"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createTags(data: { name: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  } else {
    try {
      const tag = prisma.tag.create({
        data: {
          ...data,
          user: { connect: { id: session.user.id } },
          createdAt: new Date(),
        },
      });
      //   revalidate path
      revalidatePath("/tags");
      return tag;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}

export async function getTags() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  } else {
    return prisma.tag.findMany({
      where: { userId: session.user.id },
    });
  }
}
