// pages/api/countdownEndTime/route.ts
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest ) => {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed!' }, { status: 405 });
  }

  try {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + 30);

    return NextResponse.json({ targetDate: futureDate.toISOString() }, { status: 200 });
  } catch (error) {
    console.error('Error in target-date API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};