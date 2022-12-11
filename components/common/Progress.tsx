import clsx from "clsx";

interface IProps {
  progress: number;
  label?: React.ReactNode;
  size?: number;
  strokeWidth?: number;
}

const Progress = ({
  progress,
  label,
  size = 100,
  strokeWidth = 10,
}: IProps) => {
  progress = Math.min(Math.max(0, progress), 100);
  const center = size / 2;
  const radius = center - strokeWidth;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);

  const getProgressStrokeStyle = (progress: number) => {
    if (progress <= 25) {
      return "stroke-red-500";
    } else if (progress <= 60) {
      return "stroke-yellow-500";
    } else {
      return "stroke-green-500";
    }
  };

  return (
    <svg style={{ width: size, height: size }}>
      <circle
        className="stroke-gray-200 fill-transparent"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={clsx(
          getProgressStrokeStyle(progress),
          "fill-transparent -rotate-90 origin-center"
        )}
        strokeDashoffset={`${dashArray - (dashArray - dashOffset)}px`}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${dashArray}px`}
      />
      <text
        className="font-semibold dark:fill-white"
        x="50%"
        y="50%"
        dy="0.3rem"
        textAnchor="middle"
      >
        {label || `${progress}%`}
      </text>
    </svg>
  );
};

export default Progress;
