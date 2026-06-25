import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { ZodError } from "zod";

// TODO: Implement rate limiting (e.g., using upstash/ratelimit or similar)
// to prevent abuse. Recommended: max 5 requests per IP per 10 minutes.

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, service, message } = parsed.data;

    // Simulate email sending
    console.log("Sending contact form email:", {
      to: "info@feedindiahealthcare.com",
      from: email,
      subject: `New Contact: ${service}`,
      body: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
      timestamp: new Date().toISOString(),
    });

    // Simulate async email delay
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
