import React, { useEffect, useState } from "react";

type AnimateBackgroundType = {
  firstUserLogin: string | undefined;
  secondUserLogin: string | undefined;
};

export const AnimateBackground: React.FC<AnimateBackgroundType> = ({
  firstUserLogin,
  secondUserLogin,
}) => {
  const [offsetY, setOffsetY] = useState<number>(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/*{secondUserLogin && firstUserLogin*/}
      {/*    ? <div className={'users-login-header'}>*/}
      {/*      <div className={'first-user-login'}>{secondUserLogin}</div>*/}
      {/*      <div className={'second-user-login'}>{firstUserLogin}</div>*/}
      {/*    </div>*/}
      {/*    : null*/}
      {/*}*/}

      <div
        style={{ transform: `translateY(${offsetY * 0.5 - 120}px)` }}
        className={"bg-wrapper"}
      ></div>
    </>
  );
};
