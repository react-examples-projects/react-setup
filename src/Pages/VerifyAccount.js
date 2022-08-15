import { useParams } from "react-router-dom";
import { verifyAccount } from "helpers/api";
import { useEffect, useState } from "react";

export default function VerifyAccount() {
  const { token } = useParams();
  console.log(token)
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function verify() {
      try {
        setLoading(true);
        const res = await verifyAccount(token);
        setData(res);
        console.log(res);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token]);

  return (
    <div>
      {isLoading && <p>Verificando token...</p>}
      {isError && <p>Ocurrió un error ...</p>}
      {data && <p>El token se verifico con exito...</p>}
    </div>
  );
}
