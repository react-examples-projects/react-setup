import useToggle from "hooks/utils/useToggle";
import UserList from "components/UserList";
import ModalCreateUser from "components/Modals/ModalCreateUser";
import UsersProvider from "context/Users/UsersProvider";
import { Text, Button } from "@geist-ui/core";

export default function Users() {
  const [isOpenModalCreate, toggleOpenModalCreate] = useToggle();

  return (
    <>
      <Text h4>Usuarios Registrados</Text>
      <Text p>
        Se listan todo los usuarios registrado en la base de datos, para mejores
        resultados use los filtros de busquedas.
      </Text>

      <Button
        type="success"
        className="mb-3"
        scale={0.8}
        onClick={toggleOpenModalCreate}
      >
        Crear usuario
      </Button>

      <UsersProvider>
        <UserList />
        <ModalCreateUser {...{ isOpenModalCreate, toggleOpenModalCreate }} />
      </UsersProvider>
    </>
  );
}
