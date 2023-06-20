import { FunctionComponent } from "react";

type menuBtnProps = {
  open?: boolean;
  size: number;
};

const MenuButton: FunctionComponent<menuBtnProps> = ({ open, size }) => {
  return (
    <div
      className="relative duration-700 "
      style={{ width: size, height: size }}
    >
      <div
        className={` absolute h-1/8 mt-2 rounded-full bg-white w-4/5 left-1/2 -translate-x-1/2 duration-500 ${
          open ? "top-0 w-4/5" : "top-1/3 w-full rotate-135"
        }`}
      ></div>
      <div
        className={`absolute h-1/8 mt-2 top-1/3 rounded-full bg-white  duration-500  ${
          open ? "w-full left-0 " : "top-1/3 w-0 left-1/2"
        }`}
      ></div>
      <div
        className={` absolute h-1/8 mt-2 rounded-full bg-white  duration-500 left-1/2 -translate-x-1/2  ${
          open ? "top-2/3 w-4/5" : "top-1/3 w-full -rotate-135"
        }`}
      ></div>
    </div>
  );
};

export default MenuButton;
