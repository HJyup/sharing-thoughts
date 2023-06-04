import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { client } from '@/pages/api/axios-client';
export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const Modal = ({ isVisible, onClose, email }: ModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, email };
      await client.post('/api/post', {
        body: JSON.stringify(body),
      });
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
      <div className="rounded-2xl w-[600px] text-neutral-100 bg-neutral-800 bg-opacity-25 p-10 flex-col flex gap-3">
        <h2 className="flex text-2xl font-bold tracking-tight text-neutral-300 items-center justify-center flex-col md:flex-row gap-2 pb-5">
          Create the
          <span className="gradient">Post.</span>
        </h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start pl-5 pr-5 pb-5">
              <label className="block mb-2 text-lg font-bold text-neutral-400">
                Title
              </label>
              <input
                type="text"
                className="bg-transparent text-neutral-100 text-sm font-bold block w-full p-2.5 border-r-2 border-r-violet-700"
                placeholder="Enter your title"
                required
                maxLength={30}
                onChange={e => setTitle(e.target.value)}
              />
              <label className="block mb-2 text-lg font-bold text-neutral-400 pt-5">
                Description
              </label>
              <textarea
                className="bg-transparent text-neutral-100 text-sm block w-full p-2.5 border-r-2 border-violet-700"
                placeholder="Write your thoughts here..."
                required
                maxLength={100}
                onChange={e => setContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={!content || !title}
              className="rounded-md w-full bg-violet-800 px-3.5 py-2.5 text-sm font-semibold text-violet-100 shadow-sm hover:bg-violet-900 mt-10 disabled:bg-transparent border-2 border-violet-800 transition-all disabled:text-neutral-500"
            >
              Publish
            </button>
          </form>
        </div>
        <div className="flex justify-end">
          <button
            className="text-neutral-500 transition-colors hover:text-violet-500 text-sm"
            onClick={() => onClose()}
          >
            Exit editing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
