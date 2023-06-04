import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/pages/api/client';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body.body);
  if (data.email) {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        text: data.content,
        user: { connect: { email: data.email } },
      },
    });

    res.status(201).json(post);
  }
}

export default handle;
