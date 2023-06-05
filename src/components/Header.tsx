import Image from 'next/image';
import { signIn } from 'next-auth/react';

export interface HeaderProps {
  name: string | undefined | null;
  image: string | undefined | null;
  status: string;
}

const Header = ({ name, image, status }: HeaderProps) => {
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1 justify-end">
          {status === 'authenticated' && image ? (
            <div className={'flex text-neutral-100 gap-3'}>
              <Image
                className="rounded-3xl"
                height={24}
                width={24}
                src={image}
                alt="GitHub Image"
              />{' '}
              {name}
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
  );
};

export default Header;
