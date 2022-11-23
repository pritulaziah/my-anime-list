import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import clsx from "clsx";

interface IProps {
  starsCount?: number;
  value?: number;
  readonly?: boolean;
}

const Rating = ({ starsCount = 5, value = 0, readonly = false }: IProps) => {
  const starArray = Array.from({ length: starsCount });
  const valuePercentage = Math.round((value / starsCount) * 100);

  const renderStart = (key: React.Key) => (
    <FontAwesomeIcon
      key={key}
      icon={faStar}
      width={24}
      height={24}
      className="inline-block"
    />
  );

  return (
    <div className={clsx(["relative overflow-hidden", readonly && "pointer"])}>
      <div className="text-gray-300">
        {starArray.map((_, index) => renderStart(index))}
      </div>
      <div
        className="text-yellow-400 absolute left-0 top-0 overflow-hidden whitespace-nowrap"
        style={{ width: `${valuePercentage}%` }}
      >
        {starArray.map((_, index) => renderStart(index))}
      </div>
    </div>
  );
};

export default Rating;
