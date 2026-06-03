import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const mediaDir = path.join(process.cwd(), 'public', 'media');
  
  try {
    if (!fs.existsSync(mediaDir)) {
      return NextResponse.json({ files: [] });
    }
    
    const files = fs.readdirSync(mediaDir);
    // Filter out hidden files like .DS_Store
    const validFiles = files.filter(file => !file.startsWith('.'));
    
    return NextResponse.json({ files: validFiles });
  } catch (error) {
    console.error("Error reading media directory:", error);
    return NextResponse.json({ files: [], error: "Failed to read media directory" }, { status: 500 });
  }
}
