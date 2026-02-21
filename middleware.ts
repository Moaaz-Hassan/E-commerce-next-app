import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/allorders" , "/cart"] ;
const aythProtectedRoutes = ["/login" , "/register"] ;

export default async function middleware(req:NextRequest) {
    const token = req.cookies.get("token")?.value;
    if(protectedRoutes.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.next()
        }else{
            const redirectURL = new URL("/login" , process.env.PASS_URL) ;
            redirectURL.searchParams.set("url" ,req.nextUrl.pathname ) 
            return NextResponse.redirect(redirectURL)
        }
    }

    if(aythProtectedRoutes.includes(req.nextUrl.pathname)){
        if(!token){
            return NextResponse.next()
        }else{
            const redirectURL = new URL("/" , process.env.PASS_URL) ;
            return NextResponse.redirect(redirectURL)
        }
    }

    return NextResponse.next()

    
}