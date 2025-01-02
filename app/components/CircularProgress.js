const CircularProgress = ({ duration, timeLeft }) => {
  const convertTimeToSeconds = (timeString) => {
    const [hrs, mins, secs] = timeString.split(":").map(Number);
    return hrs * 3600 + mins * 60 + secs;
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const timeLeftInSeconds = convertTimeToSeconds(timeLeft);
  const progress =
    ((duration / 1000 - timeLeftInSeconds) / (duration / 1000)) * circumference;

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute text-primary top-0 left-0 -rotate-90"
    >
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke="lightgray"
        strokeWidth="5"
        fill="none"
        opacity={0.2}
      />
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-linear"
      />
    </svg>
  );
};

export default CircularProgress;
