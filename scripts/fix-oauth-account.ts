import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function linkGoogleAccount() {
  try {
    // Get the email from the command line or use a default
    const email = process.argv[2] || "mohanmutyalu@gmail.com";

    console.log(`Looking for user with email: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      return;
    }

    console.log(`✅ Found user: ${user.name} (${user.email})`);
    console.log(`Current role: ${user.role}`);
    console.log(`Linked accounts: ${user.accounts.length}`);

    if (user.accounts.length > 0) {
      console.log("Existing accounts:");
      user.accounts.forEach((acc) => {
        console.log(`  - ${acc.provider} (${acc.providerAccountId})`);
      });
    }

    // Check if there's a password
    if (user.password) {
      console.log(
        "\n⚠️  This account has a password. You should login with email/password."
      );
      console.log("Or delete the password if you want to use only OAuth.");

      // Option to remove password
      const removePassword = process.argv[3] === "--remove-password";
      if (removePassword) {
        await prisma.user.update({
          where: { id: user.id },
          data: { password: null },
        });
        console.log("✅ Password removed. You can now use Google OAuth.");
      } else {
        console.log(
          "\nTo remove the password and enable OAuth-only login, run:"
        );
        console.log(
          `npx tsx scripts/fix-oauth-account.ts ${email} --remove-password`
        );
      }
    } else {
      console.log("\n✅ This account has no password.");
      console.log(
        "The OAuth linking issue might be due to a different problem."
      );
      console.log("Try deleting any existing Google account entries first.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

linkGoogleAccount();
