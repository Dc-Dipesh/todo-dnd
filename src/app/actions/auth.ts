"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function signup(
  name: string,
  username: string,
  email: string,
  password: string
) {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Create a VerificationToken
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp,
      expires: new Date(Date.now() + 3600000), // 1 hour from now
    },
  });

  // Send OTP via email (simulated here, use a real email service in production)
  console.log(`Sending OTP ${otp} to ${email}`);

  return { success: true };
}

export async function verifyOtp(email: string, otp: string) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: otp,
      expires: { gt: new Date() },
    },
  });

  if (!verificationToken) {
    throw new Error("Invalid or expired OTP");
  }

  // Mark user as verified
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  // Delete the used verification token
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { success: true };
}
