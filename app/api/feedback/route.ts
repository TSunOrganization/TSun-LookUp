import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const formspreeUrl = process.env.FORMSPREE_URL;

    if (!formspreeUrl) {
      console.error("FORMSPREE_URL is not defined in environment variables.");
      throw new Error("Server configuration error.");
    }

    const response = await fetch(formspreeUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}