import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import RSVP from '@/models/RSVP';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (!body.invitationId || !body.name || body.attending === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRSVP = new RSVP({
      invitationId: body.invitationId,
      name: body.name,
      attending: body.attending,
      guestCount: body.attending ? (body.guestCount || 1) : 0,
    });

    const saved = await newRSVP.save();
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('RSVP Create Error:', error);
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}
