import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if we are on Vercel or have Blob token configured
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (blobToken) {
      // Use Vercel Blob for production
      const blob = await put(file.name, file, {
        access: 'public',
        token: blobToken
      });
      return NextResponse.json({ url: blob.url });
    }

    // Fallback to local filesystem for development
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(bytes));

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      // This will fail on Vercel production, which is expected if token is missing
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Create unique filename
    const originalName = file.name || 'file.jpg';
    const ext = originalName.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    const filepath = path.join(uploadDir, filename);
    
    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file. If hosting on Vercel, ensure BLOB_READ_WRITE_TOKEN is configured.' }, { status: 500 });
  }
}
