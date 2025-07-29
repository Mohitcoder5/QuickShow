import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../configs/db.js"; // Make sure to import your DB connector

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB(); // Make sure the DB is connected

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    console.log("Creating user:", userData);
    await User.create(userData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.delete" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    console.log("Deleted user:", id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.update" },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    console.log("Updating user:", userData);
    await User.findByIdAndUpdate(id, userData);
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
