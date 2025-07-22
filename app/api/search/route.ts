import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let number = searchParams.get("number")

  if (!number) {
    return NextResponse.json({ error: "Number parameter is required" }, { status: 400 })
  }

  // Sanitize and validate the number
  number = number.replace(/\D/g, ""); // Remove non-numeric characters
  if (!/^(\d{10,12})$/.test(number)) {
    return NextResponse.json({ error: "Invalid number format. Please enter a valid 10 to 12-digit phone number." }, { status: 400 });
  }


  try {
    // Using the new API endpoint
    const url = `https://fam-official.serv00.net/sim/famdata.php?num=${number}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch data from the API" }, { status: 500 })
  }
}