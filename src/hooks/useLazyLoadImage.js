import { useEffect } from "react";
import useInView from "./useInView";

export default function useLazyLoadImage() {
  const { inView, ref } = useInView();

  useEffect(() => {
    const img = ref.current;
    if (inView) {
      img.src = img.alt;
      img.classList.add("active");
    }
  }, [inView]);

  return { ref };
}
