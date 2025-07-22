import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const formspreeUrl = process.env.FORMSPREE_URL;

    if (!formspreeUrl) {
      console.error("FORMSPREE_URL is not defined in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch(formspreeUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    // Crucially, check if Formspree indicates success
    if (response.ok && data.ok) {
      return NextResponse.json({ message: "Feedback submitted successfully!" }, { status: 200 });
    } else {
      // Forward the error from Formspree or a generic one
      return NextResponse.json(
        { error: data.error || "Failed to submit feedback." },
        { status: response.status || 500 }
      );
    }
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}