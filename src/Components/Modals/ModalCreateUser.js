import React, { useRef, useState } from "react";
import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import createUserSchema from "helpers/schema/createUserSchema";
import UserPlaceholderImg from "../../Assets/user_placeholder.png";
import { toFormDataObj } from "helpers/utils";
import { createUser } from "helpers/api";
import { Modal, Input, Select } from "@geist-ui/core";
import { isValidFile, imageToBase64 } from "helpers/utils";

export default function ModalCreateUser({
  isOpenModalCreate,
  toggleOpenModalCreate,
}) {
  const [userProfile, setUserProfile] = useState(null);
  const [userRank, setUserRank] = useState("user");
  const { errors, handleSubmit, register } =
    useFormValidation(createUserSchema);
  const containerUserRole = useRef(null);

  const onSubmit = async (values) => {
    const data = toFormDataObj({
      ...values,
      rank: userRank,
      perfil_photo: userProfile,
    });
    const res = await createUser(data);
    console.log(res);
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
        <form onSubmit={handleSubmit(onSubmit)} id="edit-user">
          <Input
            {...register("name")}
            id="name"
            name="name"
            width="100%"
            className="mb-2"
          >
            Nombre Completo
          </Input>
          <ErrorText
            className="mt-2"
            text={errors.name?.message}
            isVisible={!!errors.name?.message}
          />

          <Input
            {...register("email")}
            htmlType="email"
            id="email"
            name="email"
            width="100%"
            className="mb-2"
          >
            Correo Electrónico
          </Input>
          <ErrorText
            className="mt-2"
            text={errors.email?.message}
            isVisible={!!errors.email?.message}
          />

          <Input.Password
            {...register("password")}
            id="password"
            name="password"
            width="100%"
            className="mb-2"
          >
            Contraseña
          </Input.Password>
          <ErrorText
            className="mt-2"
            text={errors.password?.message}
            isVisible={!!errors.password?.message}
          />

          <Input.Password
            {...register("passwordConfirm")}
            id="passwordConfirm"
            name="passwordConfirm"
            width="100%"
            className="mb-2"
          >
            Confirmar Contraseña
          </Input.Password>
          <ErrorText
            className="mt-2"
            text={errors.passwordConfirm?.message}
            isVisible={!!errors.passwordConfirm?.message}
          />

          <div className="mb-2 position-relative" ref={containerUserRole}>
            <label className="label">Rango</label>
            <Select
              placeholder="Rango"
              onChange={(value) => setUserRank(value)}
              value={userRank}
              name="rank"
              id="rank"
              getPopupContainer={() => containerUserRole.current}
              width="100%"
              initialValue={userRank}
            >
              <Select.Option value="admin">Administrador</Select.Option>
              <Select.Option value="user">Usuario</Select.Option>
            </Select>
          </div>

          <Input
            {...register("perfil_photo")}
            htmlType="file"
            id="perfil_photo"
            name="perfil_photo"
            accept="image/jpg, image/png, image/svg, image/jpeg"
            width="100%"
            className="mb-2"
            onChange={onChangeProfile}
          >
            Imágen de perfil
          </Input>
          <ErrorText
            className="mt-2"
            text={errors.perfil_photo?.message}
            isVisible={!!errors.perfil_photo?.message}
          />

          <img
            src={userProfile || UserPlaceholderImg}
            alt="User Profile"
            title="User Profile"
            style={{ borderRadius: "5px" }}
          />
        </form>
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModalCreate}>
        Cancelar
      </Modal.Action>
      <Modal.Action htmlType="submit" form="edit-user">
        Crear
      </Modal.Action>
    </Modal>
  );
}
