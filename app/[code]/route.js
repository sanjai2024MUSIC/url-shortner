import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb.js";
import Url from "@/models/url";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { code } = await params;

    const urlData = await Url.findOne({
      shortCode: code,
    });

    if (!urlData) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.redirect(urlData.originalUrl);

  } catch (error) {
    console.error("Redirect error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}