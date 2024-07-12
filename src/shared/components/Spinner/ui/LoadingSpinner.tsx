import "../styles/LoadingSpinner.scss";

import { WrapperMessage } from "../../WrapperMessage";

export const LoadingSpinner = () => {
  return (
    <WrapperMessage>
      <span className="loader"></span>
    </WrapperMessage>
  );
};
