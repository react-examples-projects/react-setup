import { useEffect, useState } from "react";

/**
 * Show an image loader placeholder and replace when it's been loaded
 * @param {String} src The original source url
 * @param {String} placeholder a loader for the image
 * @returns {String} The image url
 */
export default function useLazyloadImage({ src }) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setLoaded(src);
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);

    return () => img.removeEventListener("load", onLoad);
  }, [src]);

  return isLoaded;
}
