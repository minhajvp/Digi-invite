import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Invitation from '@/models/Invitation';

export async function GET() {
  try {
    await dbConnect();
    const invitations = await Invitation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(invitations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Generate a unique slug: meera-arjun-random
    const randomStr = Math.random().toString(36).substring(2, 8);
    const slugBase = body.brideName && body.groomName 
      ? `${body.brideName}-${body.groomName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'invite';
    const slug = `${slugBase}-${randomStr}`;

    const newInvitation = new Invitation({
      ...body,
      slug,
      isActive: true
    });

    const saved = await newInvitation.save();

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Create Invitation Error:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}
