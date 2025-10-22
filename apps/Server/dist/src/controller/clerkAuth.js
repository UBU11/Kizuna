import { getAuth } from "@hono/clerk-auth";
import "../";
const clerkAuth = (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            message: "You are not logged in.",
        });
    }
    return c.json({
        message: "You are logged in!",
        userId: auth.userId,
    });
};
export default clerkAuth;
