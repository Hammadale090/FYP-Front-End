import { stripe } from "@/config/stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
// import { auth } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const json = await req.json();
  const {
    productName,
    customerEmail,
    profileId,
    amount,
    planId,
    success_url,
    cancel_url,
  } = json;

  // const userSession = await auth();
  const userSession = await getServerSession(authOptions);

  // Check if customer exists, if not create a new customer
  let customer: any;
  const customers = await stripe.customers.list({ email: customerEmail });
  if (customers.data.length > 0) {
    customer = customers.data[0];
  } else {
    customer = await stripe.customers.create({
      email: customerEmail,
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: "subscription",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    customer: customer.id,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: parseInt(amount),
          product_data: {
            name: productName,
          },
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      profileId: profileId,
      customerId: customer.id,
      planId: planId,
      jwt: userSession?.user?.data?.jwt ?? "",
    },
  });
  console.log("stripeSession ", stripeSession);
  return new NextResponse(
    JSON.stringify({
      url: stripeSession.url,
    })
  );
}
