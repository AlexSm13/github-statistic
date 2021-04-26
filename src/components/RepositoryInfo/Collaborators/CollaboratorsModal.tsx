import React, { useEffect } from "react";

type CollaboratorsModalType = {
  modalToggle: () => void;
  getHomies: () => JSX.Element[];
};

export const CollaboratorsModal: React.FC<CollaboratorsModalType> = ({
  modalToggle,
  getHomies,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const showModal = document.querySelector(".more-info");
      const modalWrapper = document.querySelector(".more-info-wrapper");
      if (showModal && modalWrapper) {
        showModal.classList.add("modal-show-animation");
        modalWrapper.classList.add("modal-wrapper-animation");
      }
    }, 0);
  });

  return (
    <div className={"more-info-wrapper"} onClick={modalToggle}>
      <div
        style={{ width: 600, padding: 10 }}
        className={"more-info"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"homies-container"}>
          <h1 className={"title"}>Часто оказывается в одном репозитории</h1>
          {getHomies()}
        </div>
      </div>
    </div>
  );
};
