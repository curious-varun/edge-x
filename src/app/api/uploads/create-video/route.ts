import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, collectionId } = body;

    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
    const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;

    if (!BUNNY_API_KEY || !BUNNY_LIBRARY_ID) {
      return NextResponse.json(
        { error: 'Missing Bunny Stream credentials' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos`,
      {
        method: 'POST',
        headers: {
          'AccessKey': BUNNY_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title || 'Untitled Video',
          collectionId: collectionId || null
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Bunny Stream API error:', error);
      return NextResponse.json(
        { error: 'Failed to create video' },
        { status: response.status }
      );
    }

    const videoData = await response.json();
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const signatureInput = `${BUNNY_LIBRARY_ID}${BUNNY_API_KEY}${expirationTime}${videoData.guid}`;
    const authSignature = generateSHA256(signatureInput);

    return NextResponse.json({
      videoId: videoData.guid,
      libraryId: BUNNY_LIBRARY_ID,
      authSignature,
      authExpire: expirationTime
    });

  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateSHA256(message: string): string {
  return createHash('sha256').update(message).digest('hex');
}

