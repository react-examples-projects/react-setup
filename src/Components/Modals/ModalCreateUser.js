import React, { useRef, useState } from "react";
import UserPlaceholderImg from "../../Assets/user_placeholder.png";
import { Modal, Input, Select } from "@geist-ui/core";
import { isValidFile, imageToBase64 } from "helpers/utils";

export default function ModalCreateUser({
  isOpenModalCreate,
  toggleOpenModalCreate,
}) {
  const [userProfile, setUserProfile] = useState(UserPlaceholderImg);
  const containerUserRole = useRef(null);
  const onEditUser = (e) => {
    e.preventDefault();
  };

  const onChangeProfile = async (e) => {
    const [file] = e.target.files;
    if (isValidFile(file)) {
      const imgUrl = await imageToBase64(file);
      setUserProfile(imgUrl);
    } else {
      setUserProfile(UserPlaceholderImg);
    }
  };

  return (
    <Modal visible={isOpenModalCreate} onClose={toggleOpenModalCreate}>
      <Modal.Title>Crear Usuario</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Rellene los campos solicitados
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={onEditUser} id="edit-user">
          <Input id="username" name="username" width="100%" className="mb-2">
            Nombre Completo
          </Input>

          <Input
            htmlType="email"
            id="email"
            name="email"
            width="100%"
            className="mb-2"
          >
            Correo Electrónico
          </Input>

          <Input.Password
            id="password"
            name="password"
            width="100%"
            className="mb-2"
          >
            Contraseña
          </Input.Password>

          <div className="mb-2 position-relative" ref={containerUserRole}>
            <label className="label">Rango</label>
            <Select
              placeholder="Rango"
              onChange={null}
              name="rank"
              id="rank"
              getPopupContainer={() => containerUserRole.current}
              width="100%"
            >
              <Select.Option value="1">Administrador</Select.Option>
              <Select.Option value="2">Usuario</Select.Option>
            </Select>
          </div>

          <Input
            htmlType="file"
            id="profile"
            name="profile"
            accept="image/jpg, image/png, image/svg, image/jpeg"
            width="100%"
            className="mb-2"
            onChange={onChangeProfile}
          >
            Imágen de perfil
          </Input>

          <img
            src={userProfile}
            alt="User Profile"
            title="User Profile"
            style={{ borderRadius: "5px" }}
          />
        </form>
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModalCreate}>
        Cancelar
      </Modal.Action>
      <Modal.Action type="submit" form="edit-user">
        Editar
      </Modal.Action>
    </Modal>
  );
}
