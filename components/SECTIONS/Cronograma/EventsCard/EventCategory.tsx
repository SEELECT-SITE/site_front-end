"use client";
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface EventCategory extends HTMLAttributes<HTMLElement> {
  category: string;
}

export default function EventCategory({
  className,
  id,
  category,
  ...props
}: EventCategory) {
  return (
    <span
      {...props}
      className={twMerge(
        "p-1 px-2 bg-white text-gray-500 rounded-full capitalize",
        className
      )}
    >
      {category}
    </span>
  );
}
