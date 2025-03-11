import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing", "/api/users", "/api/balance", "/api/webhooks(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+.[w]+$|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ],
};
