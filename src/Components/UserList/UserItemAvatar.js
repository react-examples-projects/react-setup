import css from "styles/User.module.scss";
import cls from "classnames";
import useLazyloadImage from "hooks/utils/useLazyLoadImage";
import Skeleton from "react-loading-skeleton";
import { USER_RANKS } from "config";

export default function UserItemAvatar({ name, rank, perfil_photo }) {
  const isLoaded = useLazyloadImage({ src: perfil_photo });
  const isAdmin = rank === USER_RANKS.ADMIN.name;

  if (isLoaded) { 
    return (
      <img
        className={cls(css.userProfile, {
          [css.userAdmin]: isAdmin,
        })}
        alt={`${name} profile avatar`}
        src={perfil_photo}
      />
    );
  }

  return (
    <Skeleton
      baseColor="#d3d3d3"
      height={50}
      width={50}
      containerClassName={css.userSkeletonLoader}
      circle
    />
  );
}
