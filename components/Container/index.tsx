import React, { FunctionComponent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface ContainerProps
{
    children?:ReactNode;
    className?:string;
}

const Container: FunctionComponent<ContainerProps> = ({children, className}) => {
  return (
    <div className={twMerge(`flex flex-col px-6 items-center justify-between text-l-cian`,className)}>{children}</div>
  )
}

export default Container