import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use the correct Stripe API version
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export async function POST(request: Request) {
  try {
    // Log the incoming request
    console.log("Incoming request to create checkout session");

    const { title, price, username, email } = await request.json();

    // Log the parsed request body
    console.log("Request body:", { title, price, username, email });

    // Validate input
    if (!title || !price || !username || !email) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert price to cents (remove "$" and multiply by 100)
    const unitAmount = parseInt(price.replace("$", "")) * 100;
    if (isNaN(unitAmount)) {
      console.error("Invalid price format");
      return NextResponse.json(
        { error: "Invalid price format" },
        { status: 400 }
      );
    }

    // Log the unit amount
    console.log("Unit amount (in cents):", unitAmount);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        username,
        email,
      },
    });

    // Log the created session
    console.log("Stripe session created:", session);

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ahmedmemon3344@gmail.com",
      subject: "New Order Placed",
      text: `
        Username: ${username}
        Email: ${email}
        Rank: ${title}
        Price: ${price}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}