import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/pages/api/client';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const email = query.email;
  if (typeof email === 'string') {
    const posts = await prisma.user.findMany({
      where: {
        email: email,
      },
      select: {
        posts: true,
      },
    });
    return res.status(201).json(posts[0].posts.length);
  }
  return res.status(204);
}

export default handle;
