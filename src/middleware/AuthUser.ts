import { TokenType } from "@/types/type";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const AuthUser = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo: any = jwt.verify(token, "default_secret_key");
    console.log("extractAuthUserInfo =>", extractAuthUserInfo);
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;
