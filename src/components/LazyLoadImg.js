import { useEffect, useRef } from "react";

const LazyLoadImg = ({ url }) => {
  const imgRef = useRef();
  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.src = url;
        img.classList.add("active");
      }
    });

    if (img) {
      observer.observe(img);
    }
    return () => {
      observer.unobserve(img);
    };
  });
  return <img alt={url} ref={imgRef} className="lazy_load_img" />;
};
export default LazyLoadImg;
