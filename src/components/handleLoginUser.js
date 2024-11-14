import { connectDB } from "@/app/lib/dbConnect";
import User from "@/app/lib/moodals/userModal";

export default async function handleLoginUser(profile) {
  await connectDB();
  let user = await User.findOne({ email: profile.email });
  if (!user) {
    const obj = {
      name: profile.name,
      email: profile.email,
      password: "google"
    };
    user = new User(obj);
    await user.save();
  }
  return user;
}