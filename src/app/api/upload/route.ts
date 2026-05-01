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

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (blobToken) {
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
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const originalName = file.name || 'file.mp3';
    const ext = originalName.split('.').pop() || 'mp3';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    const filepath = path.join(uploadDir, filename);
    
    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file. ' + (error.message || '')
    }, { status: 500 });
  }
}
