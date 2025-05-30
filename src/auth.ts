import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { ConnectDB } from "./database/ConnectDB"
import { User } from "./models/user";
import mongoose from "mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })],

  callbacks : {
    async signIn({ user }) {
      try {
        console.log("User Info from Google:", user);
        await ConnectDB();
        console.log("Connected to DB");
        console.log("connection state------",mongoose.connection.readyState);
  
        const checkUser = await User.findOne({ email: user.email });
        console.log("User found?", checkUser);
  
        if (!checkUser){
          const newUser = new User({ name: user.name, email: user.email });
          await newUser.save();
          console.log("New User Saved");
          return true;
        }else{
          return true;
        }
  
      } catch (error) {
        console.error("SIGN IN ERROR:", error);
        return false;
      }
    },

    async session ({session}) {
      await ConnectDB();
      console.log("Connected to DB");
      const findUser = await User.findOne({email : session.user.email})
      console.log("user Found!----" , findUser)
      session.user.id = findUser._id
      console.log("session---------",session)
      return session
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 3600,
    updateAge: 0
  },

  pages : {
    signIn : "/login",
  },

  secret : process.env.AUTH_SECRET

})