import React from "react";
import css from "styles/User.module.scss";
import cls from "classnames";
import useToggle from "hooks/useToggle";
import { Text, Badge, Popover, Modal, Input } from "@geist-ui/core";
import { FiMoreVertical, FiEdit3, FiTrash, FiUserMinus } from "react-icons/fi";

export default function UserItem() {
  const [isOpenMenu, toggleOpenMenu] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const content = () => (
    <>
      <Popover.Item>
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
        <Text className="m-0 c-pointer">Desactivar</Text>
      </Popover.Item>
    </>
  );

  const onDeleteUser = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <li>
        <div className={css.userListDivider}>
          <img className={css.userProfile} src="https://picsum.photos/50/50" />
          <Text className="ms-2">Nombre Completo</Text>
          <Text className="ms-5">libardojesusrengifo@gmail.com</Text>
          <Text className="ms-5">Usuario</Text>
        </div>

        <Badge type="success">Activo</Badge>

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
      </li>
      <Modal visible={isOpenModal} onClose={toggleOpenModal}>
        <Modal.Title>Confirmar eliminación</Modal.Title>
        <Modal.Subtitle className="mt-3">
          Para eliminar el usuario debe confirmar su contraseña
        </Modal.Subtitle>
        <Modal.Content>
          <form onSubmit={onDeleteUser} id="delete-user">
            <Input
              htmlType="password"
              id="password"
              name="password"
              width="100%"
            >
              Contraseña
            </Input>
          </form>
        </Modal.Content>
        <Modal.Action passive onClick={toggleOpenModal}>
          Cancelar
        </Modal.Action>
        <Modal.Action type="submit" form="delete-user">
          Eliminar
        </Modal.Action>
      </Modal>
    </>
  );
}
