import React from "react";
import css from "styles/Loaders.module.scss"

export default function LoaderPage() {
  return (
    <div className={css.loaderPage}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
