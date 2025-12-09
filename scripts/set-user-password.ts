import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

async function setUserPassword(email: string, password: string) {
  try {
    console.log(`\n🔍 Looking for user: ${email}`);
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      console.log(`❌ User not found with email: ${email}`);
      return;
    }

    console.log(`✅ Found user: ${user.firstName} ${user.lastName} (${user.email})`);
    console.log(`   Current role: ${user.role}`);
    console.log(`   Has password: ${user.password ? "Yes" : "No"}`);

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`\n✅ Password set successfully!`);
    console.log(`   You can now login with:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email and password from command line
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log("Usage: npx tsx scripts/set-user-password.ts <email> <password>");
  console.log("Example: npx tsx scripts/set-user-password.ts vamsi14roll@gmail.com mypassword123");
  process.exit(1);
}

setUserPassword(email, password);
