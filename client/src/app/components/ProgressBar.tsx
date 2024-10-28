import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ sampleRate = 100, totalDuration = 5000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const increment = 100 / (totalDuration / sampleRate);
    let currentProgress = 0;

    const intervalId = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += increment;
        setProgress(Math.min(currentProgress, 100));
      } else {
        clearInterval(intervalId);
      }
    }, sampleRate);

    return () => clearInterval(intervalId);
  }, [sampleRate, totalDuration]);
  return (
    <div className="relative w-10 h-20 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="absolute bottom-0 w-full z-0 bg-green-500"
        style={{ height: `${progress}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${progress}%` }}
      ></motion.div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
