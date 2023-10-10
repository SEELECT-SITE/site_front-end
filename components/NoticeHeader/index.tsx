import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";

const NoticeHeader = () => {
  return (
    <Link href="#">
      <div className="bg-cian-700 w-full p-2 relative text-slate-700 group hover:bg-dark-cian hover:text-white duration-150">
        <div className="gap-2 flex justify-center items-center font-bold">
          <FaDotCircle /> DIA 06 DE NOVEMBRO <FaDotCircle />
        </div>
      </div>
    </Link>
  );
};

export default NoticeHeader;
