const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DATABASE_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  plugins: [
    admin({
      defaultRole: "member",
      roles: {
        reader: {
          name: "member",
          description: "Can read content",
          permissions: ["read", "write"],
        },
        trainer: {
          name: "trainer",
          description: "Can write content",
          permissions: ["read", "write"],
        },
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "member",
        input: true,
      },
      plan: {
        defaultValue: "free",
        input: true,
      },
      status: {
        defaultValue: "active",
        input: true,
      },
    },
  },
});
