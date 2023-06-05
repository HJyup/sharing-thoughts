import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import Body from '@/components/Body';
import Header from '@/components/Header';
import Post from '@/components/Post';
import { prisma } from '@/pages/api/client';
import { Posts } from '@/types/Post';

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  return {
    props: { posts },
  };
};

export default function Home({ posts }: Posts) {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
      <Header
        name={session?.user?.name}
        image={session?.user?.image}
        status={status}
      />
      <div>
        <Body
          email={session?.user?.email}
          setShowModal={setShowModal}
          status={status}
          showModal={showModal}
        />
        <div className="flex justify-center items-center flex-wrap gap-5 mt-10 pb-10">
          {posts.map(post => (
            <Post
              key={post.id}
              img={post.user?.image}
              title={post.title}
              text={post.text}
              name={post.user?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
