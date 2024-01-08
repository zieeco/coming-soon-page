// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    console.log("sever::>>>> ", reqBody)
    const { email } = reqBody;

    const filePath = path.join(process.cwd(), 'subscribers.txt');
    await fs.appendFile(filePath,  `${email}\n`);

    console.log('Server: Subscription successful');

    return NextResponse.json({ success: true, message: 'Subscribe successfully!'}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
  }
}