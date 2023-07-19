import { FunctionComponent, ReactNode } from "react";
import Title from "../Title";

interface PriceCardProps {
  price: number;
  title: string;
  description: string;
  children?: ReactNode;
}

const PriceCard: FunctionComponent<PriceCardProps> = ({
  price,
  title,
  description,
  children,
}) => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12 bg-white">
          <div className="text-center">
            <Title className="text-lg font-medium text-gray-900">
              {title}
              <span className="sr-only">Plan</span>
            </Title>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {price}
              </strong>
            </p>
          </div>

          {children}

          <a
            href="#"
            className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
          >
            Inscreva-se
          </a>
        </div>
      </div>
    </div>
  );
};
export default PriceCard;
