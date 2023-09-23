import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";

const NoticeHeader = () => {
  return (
    <Link href="#">
      <div className="bg-cian-700 w-full p-2 relative text-slate-700">
        <div className="gap-2 flex items-center whitespace-nowrap w-2-full">
          <FaDotCircle /> ABERTAS AS INSCRIÇÕES PARA EVENTO <b>PRE-SEELECT</b>
          <FaDotCircle />
        </div>
      </div>
    </Link>
  );
};

export default NoticeHeader;
