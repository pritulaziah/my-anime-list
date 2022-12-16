import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface IProps {
  count?: number;
  value?: number | null;
  readonly?: boolean;
  label?: React.ReactNode;
  size?: number;
  onChange?: (ratingValue: number) => void;
}

const Rating = React.forwardRef<HTMLDivElement, IProps>(
  (
    {
      count = 5,
      value: initialValue,
      readonly = false,
      size = 24,
      label,
      onChange,
    },
    ref
  ) => {
    const [ratingValue, setRatingValue] = useState(initialValue ?? 0);
    const [hoverRatingValue, setHoverRatingValue] = useState<number | null>(
      null
    );

    useEffect(() => {
      setRatingValue(initialValue ?? 0);
    }, [initialValue]);

    const renderStart = (index: number) => {
      const value = index + 1;
      const handleMouseEnter = () => setHoverRatingValue(value);
      const handleMouseLeave = () =>
        setHoverRatingValue(ratingValue > 0 ? ratingValue : null);
      const handleClick = () => {
        setRatingValue(value);
        onChange?.(value);
      };

      return (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          width={size}
          height={size}
          className="inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
      );
    };

    const stars = Array.from({ length: count }).map((_, index) =>
      renderStart(index)
    );

    const valuePercentage = Math.round(
      ((hoverRatingValue ?? ratingValue) / count) * 100
    );

    return (
      <div className="flex items-center" ref={ref}>
        <div
          className={clsx([
            "relative overflow-hidden",
            { "cursor-pointer": !readonly },
          ])}
        >
          <div className="text-gray-300">{stars}</div>
          <div
            className="text-yellow-400 absolute left-0 top-0 overflow-hidden whitespace-nowrap"
            style={{ width: `${valuePercentage}%` }}
          >
            {stars}
          </div>
        </div>
        {label && (
          <span className="ml-2 text-sm font-medium text-gray-500">
            {label}
          </span>
        )}
      </div>
    );
  }
);

export default Rating;
