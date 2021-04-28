import React, { useEffect } from "react";

type LanguageModalType = {
  modalToggle: () => void;
  getNumbersStats: () => null | JSX.Element[];
};

export const LanguageModal: React.FC<LanguageModalType> = ({
  modalToggle,
  getNumbersStats,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const showModal = document.querySelector(".languages-numbers");
      const modalWrapper = document.querySelector(".more-info-wrapper");
      if (showModal && modalWrapper) {
        showModal.classList.add("modal-show-animation");
        modalWrapper.classList.add("modal-wrapper-animation");
      }
    }, 0);
  });

  return (
    <div className={"more-info-wrapper"} onClick={modalToggle}>
      <div onClick={(e) => e.stopPropagation()} className="languages-numbers">
        <div className={"languages-numbers-stats-header"}>
          <div className={"languages-numbers-stats-name-header"}>Язык</div>
          <div className={"languages-numbers-stats-count-header"}>Репов</div>
          <div className={"languages-numbers-stats-percent-header"}>%</div>
          <div className={"languages-numbers-stats-volume-header"}>Size</div>
        </div>
        <hr />
        {getNumbersStats()}
      </div>
    </div>
  );
};
