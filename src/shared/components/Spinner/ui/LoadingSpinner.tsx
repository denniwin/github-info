import { WrapperMessage } from "../../WrapperMessage";
import "../styles/LoadingSpinner.scss";

export const LoadingSpinner = () => {
  return (
    <WrapperMessage>
      <span className="loader"></span>
    </WrapperMessage>
  );
};
