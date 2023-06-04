export interface PostProps {
  img: string;
  title: string;
  text: string;
  name: string;
}

const Post = ({ img, title, text, name }: PostProps) => {
  return (
    <div className="max-w-sm p-6 bg-black bg-transparent border border-gray-200 rounded-lg shadow w-[360px] h-[200px]">
      <div className="flex gap-5">
        <img height={24} width={24} src={img} className="rounded-2xl" />
        <span className="inline-flex items-center text-violet-700">{name}</span>
      </div>
      <div className="pt-2 pb-2">
        <h5 className="mb-2 text-xl font-semibold text-neutral-300 dark:text-white">
          {title}
        </h5>
      </div>
      <div className="mb-3 font-normal text-neutral-600 overflow-hidden break-words">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Post;
