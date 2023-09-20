const EventCardUser = () => {
  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-cian-400 via-cian-700 to-dark-cian p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] max-w-md">
      <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <time
          data-datetime="2022-10-10"
          className="block text-xs text-gray-500"
        >
          23 de novembro - 10:00h
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            Um breve introdução a linguagem dos aparelhos IOS, Swift.
          </h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            Workshop
          </span>
        </div>
      </div>
    </article>
  );
};

export default EventCardUser;
