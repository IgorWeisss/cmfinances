import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

// Getting search params from url
export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('param')
  return NextResponse.json(`Returning ${query}`)  
}

// Getting body content on POST request
export async function POST(req:NextRequest, res: NextResponse) {
  const body = await req.json()
  const responseBody = JSON.stringify({
    Status: "Returned from Next Server",
    body
  })
  return new Response(
    responseBody,
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      }
    }
    )
}