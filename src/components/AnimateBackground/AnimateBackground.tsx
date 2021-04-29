import React, { useEffect, useState } from "react";

export const AnimateBackground = () => {
  const [offsetY, setOffsetY] = useState<number>(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div
        style={{ transform: `translateY(${offsetY * 0.5 - 120}px)` }}
        className={"bg-wrapper"}
      ></div>
  );
};
