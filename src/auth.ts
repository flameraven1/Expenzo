import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { ConnectDB } from "./database/ConnectDB"
import { User } from "./models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  })],

  callbacks : {
    async signIn({user}) {
      try {
        await ConnectDB();
  
        const checkUser = await User.findOne({email : user.email});
  
        if(checkUser){
          return true
        }
        
        const newUser = new User({
          name : user.name,
          email : user.email
        })
  
        await newUser.save();
        return true;
      } catch {
        return false
      }
    },

    async session ({session}) {
      const findUser = await User.findOne({email : session.user.email})
      session.user.id = findUser.id
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