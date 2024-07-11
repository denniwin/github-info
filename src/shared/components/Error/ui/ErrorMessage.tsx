import { WrapperMessage } from "../../WrapperMessage";

interface ErrorProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorProps) => {
  return (
    <WrapperMessage>
      <div>Error: {message}</div>
    </WrapperMessage>
  );
};
