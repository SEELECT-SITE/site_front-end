import { FunctionComponent, ReactNode } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

interface Props {
  quantity: number;
}

const ThunderIcons: FunctionComponent<Props> = ({ quantity }) => {
  const thunderIcons = [];

  for (let i = 0; i < quantity; i++) {
    thunderIcons.push(
      <>
        <div className="relative w-6 h-6">
          <div className="bg-cian-400 w-6 h-6 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <BsFillLightningChargeFill
            className="drop-shadow-xlc absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 "
            fill="white"
            size={28}
          />
        </div>
      </>
    );
  }

  return <div className="flex gap-1">{thunderIcons}</div>;
};
export default ThunderIcons;
