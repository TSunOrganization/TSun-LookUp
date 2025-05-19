import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const number = searchParams.get("number")

  if (!number) {
    return NextResponse.json({ error: "Number parameter is required" }, { status: 400 })
  }

  try {
    // First try with allorigins proxy
    try {
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://fam-official.serv00.net/sim/api.php?num=${number}`,
      )}`

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      return NextResponse.json(JSON.parse(result.contents))
    } catch (allOriginsError) {
      console.error("AllOrigins proxy failed:", allOriginsError)
      // Continue to fallback method
    }

    // Fallback to direct API call
    const directUrl = `https://fam-official.serv00.net/sim/api.php?num=${number}`
    const directResponse = await fetch(directUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
        Origin: "https://fam-official.serv00.net",
        Referer: "https://fam-official.serv00.net/",
      },
    })

    if (!directResponse.ok) {
      throw new Error(`HTTP error! Status: ${directResponse.status}`)
    }

    const directData = await directResponse.json()
    return NextResponse.json(directData)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch data from the API" }, { status: 500 })
  }
}
