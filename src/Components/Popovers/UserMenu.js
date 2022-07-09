import css from "styles/User.module.scss";
import cls from "classnames";
import { Text, Popover } from "@geist-ui/core";
import { FiMoreVertical, FiEdit3, FiTrash, FiUserMinus } from "react-icons/fi";

export default function UserMenu({
  isOpenMenu,
  toggleOpenMenu,
  toggleOpenModal,
  toggleOpenModalEdit,
  toggleOpenModalIdle,
}) {
  const content = () => (
    <>
      <Popover.Item onClick={toggleOpenModalEdit}>
        <FiEdit3 className="me-3" />
        <Text className="m-0 c-pointer">Editar</Text>
      </Popover.Item>

      <Popover.Item onClick={toggleOpenModal}>
        <FiTrash className="me-3" />
        <Text className="m-0 c-pointer">Eliminar</Text>
      </Popover.Item>

      <Popover.Item line />

      <Popover.Item>
        <FiUserMinus className="me-3" />
        <Text className="m-0 c-pointer" onClick={toggleOpenModalIdle}>
          Desactivar
        </Text>
      </Popover.Item>
    </>
  );

  return (
    <Popover
      visible={isOpenMenu}
      onVisibleChange={toggleOpenMenu}
      content={content}
      portalClassName={css.popoverContainer}
      className={css.userMenuContainer}
      placement="leftEnd"
    >
      <button className={cls(css.userMenu, { [css.isActive]: isOpenMenu })}>
        <FiMoreVertical />
      </button>
    </Popover>
  );
}
