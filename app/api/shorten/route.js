
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import connectDB from "@/lib/mongodb";
import Url from "@/models/url";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    let validURL;

    try {
      validURL = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(validURL.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are allowed" },
        { status: 400 }
      );
    }

    await connectDB();

    const shortCode = randomBytes(4).toString("hex");

    await Url.create({
      originalUrl: validURL.toString(),
      shortCode: shortCode,
    });

    const shortUrl = `${new URL(request.url).origin}/${shortCode}`;

    return NextResponse.json({
      message: "URL shortened successfully",
      originalUrl: validURL.toString(),
      shortCode: shortCode,
      shortUrl: shortUrl,
    });

  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
