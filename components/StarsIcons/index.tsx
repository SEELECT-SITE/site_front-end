import { FunctionComponent, ReactNode } from "react";
import { MdStar } from "react-icons/md";

interface Props {
  quantity: number;
}

const StarsIcons: FunctionComponent<Props> = ({ quantity }) => {
  const StarsIcons = [];

  for (let i = 0; i < quantity; i++) {
    StarsIcons.push(
      <>
        <div className="relative w-6 h-6">
          <div className="bg-cian-400 w-5 h-5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <MdStar
            className="drop-shadow-xlc absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 "
            fill="white"
            size={30}
          />
        </div>
      </>
    );
  }

  return <div className="flex gap-1">{StarsIcons}</div>;
};
export default StarsIcons;
