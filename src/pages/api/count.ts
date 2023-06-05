import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/pages/api/client';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email;
  if (typeof email === 'string') {
    const posts = await prisma.user.findMany({
      where: {
        email: email,
      },
      select: {
        posts: true,
      },
    });

    res.status(201).json(posts[0].posts.length);
  }
  res.status(404).json('Does not logged');
}

export default handle;
