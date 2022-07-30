import css from "styles/User.module.scss";
import useToggle from "hooks/utils/useToggle";
import UserMenu from "components/Popovers/UserMenu";
import ModalDeleteUser from "modals/ModalUsers/ModalDeleteUser";
import ModalEditUser from "modals/ModalUsers/ModalEditUser";
import UserItemAvatar from "components/UserList/UserItemAvatar";
import useCurrentUser from "hooks/users/useCurrentUser";
import ModalIdleUser from "modals/ModalUsers/ModalIdleUser";
import { Text, Badge, Grid } from "@geist-ui/core";

export default function UserItem({
  _id,
  perfil_photo,
  name,
  email,
  rank,
  updateAt,
  isIdle,
}) {
  const [isOpenMenu, toggleOpenMenu] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenModalEdit, toggleOpenModalEdit] = useToggle();
  const [isOpenModalIdle, toggleOpenModalIdle] = useToggle();
  const { user } = useCurrentUser();

  return (
    <li>
      <div className={css.userListDivider}>
        <Grid.Container className={css.userItemContainer}>
          <Grid
            xs={24}
            sm={12}
            md={8}
            lg={8}
            className="d-flex align-items-center"
          >
            <UserItemAvatar {...{ name, rank, perfil_photo }} />
            <Text className="m-0 ms-2 text-capitalize">{name}</Text>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={8}
            lg={8}
            className="d-flex align-items-center"
          >
            <Text className="m-0">{email}</Text>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={5}
            lg={5}
            className="d-flex align-items-center"
          >
            <Text className="m-0">
              {rank === "user" ? "Usuario" : "Administrador"}
            </Text>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={3}
            lg={3}
            className="d-flex align-items-center"
          >
            {isIdle ? (
              <Badge type="warning">Desactivado</Badge>
            ) : (
              <Badge type="success">Activo</Badge>
            )}
          </Grid>
        </Grid.Container>
      </div>

      {user._id !== _id && (
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
            toggleOpenModalIdle,
          }}
        />
      )}
      <ModalDeleteUser {...{ toggleOpenModal, isOpenModal, _id }} />
      <ModalIdleUser {...{ isOpenModalIdle, toggleOpenModalIdle, _id }} />
      <ModalEditUser
        {...{
          isOpenModalEdit,
          toggleOpenModalEdit,
          perfil_photo,
          _id,
          name,
          email,
          rank,
          updateAt,
          isIdle,
        }}
      />
    </li>
  );
}