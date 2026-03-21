import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('收到扣图请求');
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: '请上传图片' }, { status: 400 });
    }

    const remoteFormData = new FormData();
    remoteFormData.append('image_file', image);
    remoteFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVE_BG_API_KEY || '',
      },
      body: remoteFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors?.[0]?.title || '扣图服务暂时打盹了');
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: { 'Content-Type': 'image/png' },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
