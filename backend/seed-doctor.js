const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const doctor = require("./model/doctor");

function parseArgs(argv) {
  const result = {
    email: undefined,
    password: undefined,
    force: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];

    if (a === "--force") {
      result.force = true;
      continue;
    }

    if (a === "--email") {
      result.email = argv[i + 1];
      i += 1;
      continue;
    }

    if (a === "--password") {
      result.password = argv[i + 1];
      i += 1;
      continue;
    }

    // Allow positional: node seed-doctor.js email password
    if (!result.email) {
      result.email = a;
      continue;
    }
    if (!result.password) {
      result.password = a;
      continue;
    }
  }

  return result;
}

async function main() {
  const { email, password, force } = parseArgs(process.argv);
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    console.error("Missing DB_URL in environment (.env)");
    process.exitCode = 1;
    return;
  }

  if (!email || !password) {
    console.error(
      "Usage: node seed-doctor.js --email <email> --password <password> [--force]"
    );
    console.error("   or: node seed-doctor.js <email> <password> [--force]");
    process.exitCode = 1;
    return;
  }

  await mongoose.connect(dbUrl);

  try {
    const existing = await doctor.findOne({ email });
    const hashedPassword = await bcryptjs.hash(password, 8);

    if (existing) {
      if (!force) {
        console.log(`Doctor already exists: ${email} (use --force to reset password)`);
        return;
      }

      existing.password = hashedPassword;
      await existing.save();
      console.log(`Doctor password updated: ${email}`);
      return;
    }

    const created = await doctor.create({
      name: "Dr. Eye",
      expertise: ["General Medicine"],
      // image has a default in schema
      email,
      password: hashedPassword,
      contact: "+10000000000",
      desc: "Compassionate care with a modern patient-first approach.",
      date: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      ammount: 500,
      is_doctor: true,
    });

    console.log(`Doctor created: ${created.email}`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
