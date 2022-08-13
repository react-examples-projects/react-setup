import { checkEmailExists } from "helpers/api";
import { useMutation } from "react-query";
import { useState } from "react";
import { isEmail } from "helpers/utils";

export default function useEmailInUse() {
  const [inUse, setInUse] = useState(false);
  const obj = useMutation((payload) => checkEmailExists(payload));
  const check = async (email) => {
    email = email.trim();
    if (email && isEmail(email)) {
      const res = await obj.mutateAsync(email);
      setInUse(res);
    }
  };
  return { ...obj, check, inUse };
}
