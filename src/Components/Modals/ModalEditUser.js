import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import editUserSchema from "helpers/schema/editUserSchema";
import useEditUser from "hooks/useEditUser";
import useToast from "hooks/useToast";
import useUsers from "hooks/useUsers";
import UserPlaceholderImg from "assets/user_placeholder.png";
import { useRef, useState } from "react";
import { Modal, Input, Select, Grid, Text, Checkbox } from "@geist-ui/core";
import {
  toFormDataObj,
  getErrorValidation,
  isValidFile,
  imageToBase64,
} from "helpers/utils";

export default function ModalEditUser({
  perfil_photo,
  _id,
  name,
  email,
  rank,
  isIdle,
  updateAt,
  isOpenModalEdit,
  toggleOpenModalEdit,
}) {
  const { error, success } = useToast();
  const [isCurrentUserIdle, setCurrentUserIdle] = useState(isIdle);
  const [userProfile, setUserProfile] = useState(null);
  const [userImg, setUserImg] = useState(perfil_photo || UserPlaceholderImg);
  const [userRank, setUserRank] = useState(rank);
  const { editUser } = useUsers();
  const { isError, isLoading, ...editUserMutation } = useEditUser();
  const { errors, reset, handleSubmit, register } = useFormValidation(
    editUserSchema,
    {
      defaultValues: {
        name,
        email,
      },
    }
  );
  console.log({isCurrentUserIdle})
  const containerUserRole = useRef(null);
  const onEditUser = async (values) => {
    const newUser = {
      ...values,
      _id,
      rank: userRank,
      isIdle: isCurrentUserIdle,
      ...(userProfile && { perfil_photo: userProfile }),
    };
    const data = toFormDataObj(newUser);
    try {
      const user = await editUserMutation.mutateAsync(data);
      editUser(user);
      reset();
      setUserProfile(null);
      success("El usuario se editó correctamente");
      toggleOpenModalEdit();
    } catch {
      error("Ocurrió un error al editar el usuario");
    }
  };

  const onChangeProfile = async (e) => {
    const [file] = e.target.files;
    if (isValidFile(file)) {
      const img64 = await imageToBase64(file);
      setUserProfile(file);
      setUserImg(img64);
    } else {
      setUserProfile(null);
      setUserImg(perfil_photo || UserPlaceholderImg);
      e.target.value = null;
    }
  };

  return (
    <Modal
      visible={isOpenModalEdit}
      onClose={toggleOpenModalEdit}
      disableBackdropClick={isLoading}
      width="600px"
    >
      <Modal.Title>Editar Usuario</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Rellene los campos con los nuevos datos
      </Modal.Subtitle>
      <Modal.Content>
        <Text className="text-muted">Última actualización {updateAt}</Text>
        <form onSubmit={handleSubmit(onEditUser)} id="edit-user">
          <Grid.Container gap={1}>
            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <Input
                  {...register("name")}
                  id="name"
                  name="name"
                  width="100%"
                  className="mb-2 text-capitalize-input"
                >
                  Nombre Completo
                </Input>
                <ErrorText
                  className="mt-2"
                  text={errors.name?.message}
                  isVisible={!!errors.name?.message}
                />
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
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
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div
                className="w-100 mb-2 position-relative"
                ref={containerUserRole}
              >
                <label htmlFor="rank" className="label">
                  Rango
                </label>
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
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
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
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <Checkbox
                  checked={isCurrentUserIdle}
                  onChange={() => setCurrentUserIdle(!isCurrentUserIdle)}
                  id="isIdle"
                  name="isIdle"
                >
                  Deshabilita usuario
                </Checkbox>
              </div>
            </Grid>
          </Grid.Container>

          <ErrorText
            isVisible={isError}
            text={getErrorValidation(editUserMutation)}
          />

          <img
            src={userImg}
            alt="User Profile"
            title="User Profile"
            className="d-block mx-auto mt-1 img-fluid"
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </form>
      </Modal.Content>
      <Modal.Action disabled={isLoading} onClick={toggleOpenModalEdit} passive>
        Cancelar
      </Modal.Action>
      <Modal.Action
        htmlType="submit"
        form="edit-user"
        disabled={isLoading}
        loading={isLoading}
      >
        Editar
      </Modal.Action>
    </Modal>
  );
}
