// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import{ MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || '';
const DATABASE_NAME = 'subscription';

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    console.log("sever::>>>> The user email submitted:: ", reqBody)
    const { email } = reqBody;

    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid Email format!'}, { status: 400 });
    }

    const client = new MongoClient(MONGODB_URI, {});
    await client.connect();

    const database = client.db(DATABASE_NAME);
    const collection = database.collection('subscribers');

    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      const errorMessage = `${email} is already subscribed!`;
      console.error("You have already subscribed::::", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    await collection.insertOne({ email });
    await client.close();

    console.log('Server: Subscription successful');

    return NextResponse.json({ success: true, message: 'Subscribe successfully!'}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
  }
};
