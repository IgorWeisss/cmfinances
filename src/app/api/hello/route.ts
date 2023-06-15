import { NextRequest, NextResponse } from "next/server";

// Getting search params from url
export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('param')
  return NextResponse.json(`Returning ${query}`)  
}

// Getting body content on POST request
export async function POST(req:NextRequest) {
  const body = await req.json()
  return NextResponse.json({
    "Status": "Data returned from Next server",
    body
  })
}