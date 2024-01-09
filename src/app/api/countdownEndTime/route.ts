// pages/api/countdownEndTime/route.ts
import { NextResponse, NextRequest } from 'next/server';

let targetDate: Date | null = null;

export const GET = async (request: NextRequest ) => {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed!' }, { status: 405 });
  }

  try {
    if (!targetDate) {
      const now = new Date();
      targetDate = new Date();
      targetDate.setDate(now.getDate() + 30);
    }

    return NextResponse.json({ targetDate: targetDate.toISOString() }, { status: 200 });
  } catch (error) {
    console.error('Error in target-date API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};