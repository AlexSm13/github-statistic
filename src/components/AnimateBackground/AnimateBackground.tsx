import React, { useEffect, useState } from "react";

type AnimateBackgroundType = {
  hasData: boolean;
};

export const AnimateBackground: React.FC<AnimateBackgroundType> = ({
  hasData,
}) => {
  const [offsetY, setOffsetY] = useState<number>(0);
  const handleScroll = (e: any) => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasData) {
    document.body.scrollTo(0, 0);
    setTimeout(() => {
      document.body.scrollTo(0, 0);
    }, 1000);
    document.body.style.overflow = "hidden";
    // @ts-ignore
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <div
      style={{
        transform: `translateY(${offsetY * 0.5 - 120}px)`,
        overflow: "",
      }}
      className={"bg-wrapper"}
    ></div>
  );
};
