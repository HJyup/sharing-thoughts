import { useQuery } from 'react-query';
import { getSession, signOut } from 'next-auth/react';

import { client } from '@/pages/api/axios-client';

export interface ControlsProps {
  showState: (value: boolean) => void;
}

const getCount = async () => {
  const session = await getSession();
  const post = await client.get('api/count', {
    params: { email: session?.user?.email },
  });

  return post.data;
};

const Controls = ({ showState }: ControlsProps) => {
  const { isLoading, data: count } = useQuery(['count'], () => getCount(), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return;

  const isDisable = count > 0;
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <button
        onClick={() => showState(true)}
        disabled={isDisable}
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
  );
};

export default Controls;
