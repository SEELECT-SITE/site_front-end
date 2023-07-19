import { FunctionComponent, ReactNode } from "react";
import "./skeleton.css";

interface Props {
  className: string;
  children?: ReactNode;
  quantity: number;
}

const SkeletonCreator: FunctionComponent<Props> = ({
  className,
  children,
  quantity,
}) => {
  const skeletons = [];

  for (let i = 0; i < quantity; i++) {
    skeletons.push(
      <div key={`skeleton-${i}`} className={`skeleton ${className}`}>
        {children}
      </div>
    );
  }

  return <>{skeletons}</>;
};
export default SkeletonCreator;