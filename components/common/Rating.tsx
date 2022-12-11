import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import clsx from "clsx";

interface IProps {
  count?: number;
  value?: number;
  readonly?: boolean;
  label?: React.ReactNode;
  size?: number;
}

const Rating = ({
  count = 5,
  value = 0,
  readonly = false,
  size = 24,
  label,
}: IProps) => {
  const starArray = Array.from({ length: count });
  const valuePercentage = Math.round((value / count) * 100);

  const renderStart = (key: React.Key) => (
    <FontAwesomeIcon
      key={key}
      icon={faStar}
      width={size}
      height={size}
      className="inline-block"
    />
  );

  return (
    <div className="flex items-center">
      <div
        className={clsx(["relative overflow-hidden", { pointer: !readonly }])}
      >
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
      {label && (
        <span className="ml-2 text-sm font-medium text-gray-500">{label}</span>
      )}
    </div>
  );
};

export default Rating;
