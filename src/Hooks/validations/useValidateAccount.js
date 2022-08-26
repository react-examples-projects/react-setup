import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { verifyAccount } from "helpers/api";

export default function useValidateAccount() {
  const { token } = useParams();
  const args = useQuery("verifyAccount", () => verifyAccount(token));

  return args;
}
