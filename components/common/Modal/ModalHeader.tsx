import { useContext } from "react";
import clsx from "clsx";
import ModalContext from "./ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader = ({ children, className }: IProps) => {
  const context = useContext(ModalContext);

  return (
    <div className="flex justify-between items-start py-4 rounded-t border-b dark:border-gray-600 mb-3">
      <h2 className={clsx("text-3xl", className)}>{children}</h2>
      <button
        type="button"
        onClick={() => context.onHide()}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <FontAwesomeIcon icon={faClose} className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ModalHeader;
