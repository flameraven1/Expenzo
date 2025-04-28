import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req : NextRequest){
    const getURL = new URL(req.url)
    const urlPath = getURL.pathname

    const isPublicPaths = urlPath === "/login"

    const cookies = await req.cookies.get("__Host-authjs.csrf-token")

    if(isPublicPaths && cookies){
        return NextResponse.redirect(new URL("/dashboard" , req.url))
    }

    if(!isPublicPaths && !cookies){
        return NextResponse.redirect(new URL("/login" , req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard" , "/login" , "/dashboard/:id"],
  }