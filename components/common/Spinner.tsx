import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type Size = "md" | "lg";

const sizes: { [key in Size]: string } = {
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

interface IProps {
  size?: Size;
}

const Spinner = ({ size = "md" }: IProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <span
        className="text-gray-200 animate-spin dark:text-gray-600"
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={clsx('', sizes[size])}
        />
      </span>
    </div>
  );
};

export default Spinner;
