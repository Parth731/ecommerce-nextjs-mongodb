import AuthUser from "@/middleware/AuthUser";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OmqYKSCF3hFuKRjEIuCnTbv1XTjRt1owrrigspgLBHM1xMOABGucRh7gFjYlIZLhc4jLH6JHld9psRYF0tEwKTd00We5iDKHv"
);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
