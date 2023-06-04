import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

import Modal from '@/components/Modal';
import Post from '@/components/Post';
import { prisma } from '@/pages/api/client';
import { Posts } from '@/types/Post';

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  console.log(session?.user?.email);
  const user = await prisma.user.findMany({
    select: {
      posts: true,
    },
  });
  const count = user[0].posts.length;
  return {
    props: { posts, count },
  };
};

export default function Home({ posts, count }: Posts) {
  const isEdit = count > 0;
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
      <header>
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end">
            {status === 'authenticated' && session?.user?.image ? (
              <div className={'flex text-neutral-100 gap-3'}>
                <img
                  className="rounded-3xl"
                  height="24px"
                  width="24px"
                  src={session.user?.image}
                />{' '}
                {session?.user?.name}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-sm font-semibold leading-6 text-neutral-300"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      <div>
        <div className="mx-auto p-6">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 text-sm leading-6 text-neutral-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Its just a small pet project.{' '}
              <a
                href="https://github.com/HJyup"
                className="font-semibold text-purple-600"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                HJyup <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="flex text-4xl font-bold tracking-tight text-neutral-300 sm:text-6xl p-0.5 items-center justify-center flex-col md:flex-row">
              Share your <span className="gradient p-2">thoughts.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              This webpage is created just for sharing your thoughts.
            </p>
            {status === 'authenticated' && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => setShowModal(true)}
                  disabled={isEdit}
                  className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-transparent disabled:text-neutral-700"
                >
                  Create a post
                </button>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold leading-6 text-neutral-600"
                >
                  Log out <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
            {session?.user?.email && (
              <Modal
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                email={session?.user?.email}
              />
            )}
          </div>
        </div>
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
