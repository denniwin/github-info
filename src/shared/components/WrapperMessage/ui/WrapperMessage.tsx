import { ReactNode } from "react";

import "../styles/WrapperMessage.scss";

export const WrapperMessage = ({ children }: { children: ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};
