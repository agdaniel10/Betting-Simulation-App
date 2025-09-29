import User from "../models/userModel.js";
import cron from "node-cron";

const cleanupUnverifiedUsers = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const result = await User.deleteMany({
        isEmailVerified: false,
        emailVerificationExpires: { $lt: new Date() },
      });

      if (result.deletedCount > 0) {
        console.log(
          `Deleted ${result.deletedCount} unverified users with expired tokens`
        );
      }
    } catch (err) {
      console.error("Error cleaning up unverified users:", err);
    }
  });
};

export default cleanupUnverifiedUsers;
