import { useRef, useState } from "react";
import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import useToast from "hooks/useToast";
import useUsers from "hooks/useUsers";
import useCreateUser from "hooks/useCreateUser";
import createUserSchema from "helpers/schema/createUserSchema";
import UserPlaceholderImg from "assets/user_placeholder.png";
import {
  toFormDataObj,
  getErrorValidation,
  isValidFile,
  imageToBase64,
} from "helpers/utils";
import { Modal, Input, Select, Grid } from "@geist-ui/core";

export default function ModalCreateUser({
  isOpenModalCreate,
  toggleOpenModalCreate,
}) {
  const { error, success } = useToast();
  const [userProfile, setUserProfile] = useState(null);
  const [userImg, setUserImg] = useState(UserPlaceholderImg);
  const [userRank, setUserRank] = useState("user");
  const { addUser } = useUsers();
  const { isError, isLoading, ...createUserMutation } = useCreateUser();
  const { errors, reset, handleSubmit, register } =
    useFormValidation(createUserSchema);
  const containerUserRole = useRef(null);

  const onSubmit = async (values) => {
    const data = toFormDataObj({
      ...values,
      rank: userRank,
      ...(userProfile && { perfil_photo: userProfile }),
    });
    try {
      const user = await createUserMutation.mutateAsync(data);
      addUser(user);
      reset();
      setUserProfile(null);
      setUserImg(UserPlaceholderImg);
      success("El usuario se creó correctamente");
      toggleOpenModalCreate();
    } catch {
      error("Ocurrió un error al crear el usuario");
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
      setUserImg(UserPlaceholderImg);
      e.target.value = null;
    }
  };

  return (
    <Modal
      visible={isOpenModalCreate}
      onClose={toggleOpenModalCreate}
      disableBackdropClick={isLoading}
      width="600px"
    >
      <Modal.Title>Crear Usuario</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Rellene los campos solicitados
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-user">
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
              <div className="w-100">
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
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
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
          </Grid.Container>

          <ErrorText
            isVisible={isError}
            text={getErrorValidation(createUserMutation)}
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
      <Modal.Action
        disabled={isLoading}
        onClick={toggleOpenModalCreate}
        passive
      >
        Cancelar
      </Modal.Action>
      <Modal.Action
        disabled={isLoading}
        loading={isLoading}
        htmlType="submit"
        form="edit-user"
      >
        Crear
      </Modal.Action>
    </Modal>
  );
}
