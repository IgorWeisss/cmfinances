import { NextRequest, NextResponse } from "next/server";

// Getting search params from url
export async function GET(req:NextRequest) {

  const origin = req.headers.get('origin')

  const { searchParams } = new URL(req.url)
  const query = searchParams.get('param')
  return new NextResponse(JSON.stringify(`Returning ${query}`), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Content-type': 'application/json'
    }
  })
}

// Getting body content on POST request
export async function POST(req:NextRequest) {

  const origin = req.headers.get('origin')

  const body = await req.json()
  const responseBody = JSON.stringify({
    Status: "Returned from Next Server",
    body
  })
  return new Response(
    responseBody,
    {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-type': 'application/json'
      }
    }
    )
}