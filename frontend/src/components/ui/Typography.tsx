import React, { ReactNode } from "react";

export const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-[40px] font-bold">{children}</h1>;
};

export const H2 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-[32px] font-bold">{children}</h1>;
};

export const H6 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-base">{children}</h1>;
};

export const H7 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-sm ">{children}</h1>;
};
