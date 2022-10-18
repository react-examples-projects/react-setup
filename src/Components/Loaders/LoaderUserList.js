import Skeleton from "react-loading-skeleton";

export default function LoaderUserList() {
  return (
    <div className="w-100 mt-3 opacity-gradient">
      <Skeleton
        height={74}
        containerClassName="w-100"
        count={10}
        className="mb-2"
      />
    </div>
  );
}
