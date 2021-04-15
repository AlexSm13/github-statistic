import React, { MouseEventHandler } from "react";

type PaginationType = {
  repPerPage: number;
  totalRep: number;
  paginate: (currentPage: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<PaginationType> = ({
  repPerPage,
  paginate,
  totalRep,
  currentPage,
}) => {
  const repNumbers: number[] = [];
  const parts = Math.ceil(totalRep / repPerPage);

  if (parts > 1) {
    for (let i = 1; i <= parts; i++) repNumbers.push(i);
  }

  return (
    <nav className={"pagination-container"}>
      <ul>
        {repNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={`pagination-item ${
              number === currentPage ? "active-link" : ""
            }`}
          >
            <div className={"pagination-link"}>
              <p>{number}</p>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
