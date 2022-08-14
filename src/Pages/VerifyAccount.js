import { useParams } from "react-router-dom";

export default function VerifyAccount() {
  const { token } = useParams();

  return <div>{token}</div>;
}
