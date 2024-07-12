import "../styles/WrapperMessage.scss";

import { ReactNode } from "react";

export const WrapperMessage = ({ children }: { children: ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};
