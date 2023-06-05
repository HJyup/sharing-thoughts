import Controls from '@/components/Controls';
import Modal from '@/components/Modal';

export interface BodyProps {
  email: string | null | undefined;
  setShowModal: (value: boolean) => void;
  status: string;
  showModal: boolean;
}

const Body = ({ email, setShowModal, status, showModal }: BodyProps) => {
  return (
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
          <Controls showState={() => setShowModal(true)} />
        )}
        {email && (
          <Modal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            email={email}
          />
        )}
      </div>
    </div>
  );
};

export default Body;
