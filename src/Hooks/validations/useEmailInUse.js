import { checkEmailExists } from "helpers/api";
import { useMutation } from "react-query";
import { useState } from "react";

export default function useEmailInUse() {
  const [inUse, setInUse] = useState(false);
  const obj = useMutation((payload) => checkEmailExists(payload));
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const check = async (email) => {
    setInUse(false);
    if (email && regexEmail.test(email)) {
      const res = await obj.mutateAsync(email);
      setInUse(res);
    }
  };
  return { ...obj, check, inUse };
}
