import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const CACHE_DIR = path.join(process.cwd(), ".next/cache/images");

export async function GET() {
  const result: {
    folder: string;
    file: string;
    filename: string;
    ext: string;
    size: number;
    created: Date;
    accessed: Date;
    preview: string;
  }[] = [];

  const folders = fs.readdirSync(CACHE_DIR);

  for (const folder of folders) {
    const folderPath = path.join(CACHE_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);
    for (const filename of files) {
      const ext = path.extname(filename);
      if (![".avif", ".webp", ".jpg", ".jpeg", ".png"].includes(ext)) continue;

      const filePath = path.join(folderPath, filename);
      const stat = fs.statSync(filePath);
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString("base64");

      result.push({
        folder,
        file: `${folder}/${filename}`,
        filename,
        ext: ext.slice(1),
        size: stat.size,
        created: stat.birthtime,
        accessed: stat.atime,
        preview: `data:image/${ext.slice(1)};base64,${base64}`,
      });
    }
  }

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { file } = await req.json(); // file: "abc123/img-xyz.avif"
  if (!file || typeof file !== "string") {
    return new NextResponse("Invalid 'file' parameter", { status: 400 });
  }

  const filePath = path.join(CACHE_DIR, file);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ ok: true, deleted: file });
  }

  return new NextResponse("File not found", { status: 404 });
}
