import css from "styles/User.module.scss";
import useToggle from "hooks/useToggle";
import UserMenu from "components/Popovers/UserMenu";
import ModalDeleteUser from "components/Modals/ModalDeleteUser";
import ModalEditUser from "components/Modals/ModalEditUser";
import { Text, Badge } from "@geist-ui/core";

export default function UserItem({
  perfil_photo,
  name,
  email,
  rank,
  updateAt,
}) {
  const [isOpenMenu, toggleOpenMenu] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();

  return (
    <li>
      <div className={css.userListDivider}>
        <img
          className={css.userProfile}
          alt={`${name} profile avatar`}
          src={perfil_photo}
        />
        <Text className="ms-2 text-capitalize">{name}</Text>
        <Text className="ms-5">{email}</Text>
        <Text className="ms-5">{rank}</Text>
      </div>
      <Badge type="success">Activo</Badge>

      <UserMenu
        {...{
          perfil_photo,
          name,
          email,
          rank,
          updateAt,

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
