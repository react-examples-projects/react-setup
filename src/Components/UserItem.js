import css from "styles/User.module.scss";
import useToggle from "hooks/useToggle";
import UserMenu from "components/Popovers/UserMenu";
import ModalDeleteUser from "components/Modals/ModalDeleteUser";
import ModalEditUser from "components/Modals/ModalEditUser";
import { Text, Badge } from "@geist-ui/core";

export default function UserItem() {
  const [isOpenMenu, toggleOpenMenu] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();

  return (
    <li>
      <div className={css.userListDivider}>
        <img className={css.userProfile} src="https://picsum.photos/50/50" />
        <Text className="ms-2">Nombre Completo</Text>
        <Text className="ms-5">libardojesusrengifo@gmail.com</Text>
        <Text className="ms-5">Usuario</Text>
      </div>
      <Badge type="success">Activo</Badge>

      <UserMenu
        {...{
          isOpenMenu,
          toggleOpenMenu,
          toggleOpenModal,
          toggleOpenModalEdit,
        }}
      />
      <ModalDeleteUser {...{ toggleOpenModal, isOpenModal }} />
      <ModalEditUser {...{ isOpenModalEdit, toggleOpenModalEdit }} />
    </li>
  );
}
