"use client";


import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;

const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShow(false));


  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>
        {props.triggerIcon}
      </button>
      <div
      ref={ref}
        className={cn(
          "w-60 absolute top-0 z-50 transition-all duration-300 bg-white rounded-r-md min-h-screen",
          { "-left-full": !show, "left-0": show }
        )}
      >
        {props.children}
      </div>
    </>
  );
};
export default SideBar;
