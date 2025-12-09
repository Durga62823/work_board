import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      password: true,
      role: true,
      emailVerified: true,
      firstName: true,
      lastName: true,
    },
  });

  console.log("\n=== User Details ===");
  console.log("Email:", user?.email);
  console.log("Name:", user?.firstName, user?.lastName);
  console.log("Role:", user?.role);
  console.log("Has password:", !!user?.password);
  console.log("Password length:", user?.password?.length);
  console.log("Email verified:", user?.emailVerified);
  console.log("Password hash (first 20 chars):", user?.password?.substring(0, 20));

  await prisma.$disconnect();
}

checkUser("vamsi14roll@gmail.com");
