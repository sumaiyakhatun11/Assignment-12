import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken({req});
    console.log(token)

//   
return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
// export const config = {
//   matcher: '/about/:path*',
// }