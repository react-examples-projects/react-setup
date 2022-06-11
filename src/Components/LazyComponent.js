import LoaderPage from "components/Loaders/LoaderPage";
import React from "react";
import { Suspense } from "react";

export function LazyComponent({
  component: Component,
  loader = "Loading page...",
}) {
  return (
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  );
}

export default function Async(component, loader = <LoaderPage />) {
  return <LazyComponent component={component} loader={loader} />;
}
