import { EmojiSadIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';
interface INothingFound {
  title: string;
  desc?: string;
  btnText?: string;
  link?: string;
}

const NothingFound: React.FC<INothingFound> = ({
  title,
  btnText,
  desc,
  link,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <EmojiSadIcon className="h-24 text-gray-200" />
      <p className="headingsm">{title}</p>
      {desc && <p className="headingxs text-center w-2/3 mx-auto">{desc}</p>}

      {btnText && link && (
        <button
          onClick={() => router.push(link)}
          className="py-2 px-6 bg-teal-500 hover:bg-teal-700 rounded-md text-white flex items-center space-x-2"
        >
          <span>{btnText}</span>
        </button>
      )}
    </div>
  );
};

export default NothingFound;
