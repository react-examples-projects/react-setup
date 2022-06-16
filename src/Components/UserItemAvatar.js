import css from "styles/User.module.scss";
import useLazyloadImage from "hooks/useLazyLoadImage";
import Skeleton from "react-loading-skeleton";

export default function UserItemAvatar({ name, perfil_photo }) {
  const isLoaded = useLazyloadImage({ src: perfil_photo });
  if (isLoaded) {
    return (
      <img
        className={css.userProfile}
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
