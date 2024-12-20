import { useEffect, useState } from "react";
import { ProgressBarProps } from "../../../types";

const ProgressBar = ({
  status,
  monthlyKWh,
  onPercentageChange,
  onNewText,
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const dailyKWh = monthlyKWh / 30;
  const secondsInDay = 24 * 3600;
  const energyRatePerSecond = (dailyKWh / secondsInDay) * 3000;

  useEffect(() => {
    if (!status) {
      if (progress != dailyKWh) {
        return;
      } else {
        setProgress(0);
        onPercentageChange(0);
        onNewText(0);
      }
    } else {
      if (progress >= dailyKWh) return;

      const intervalId = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + energyRatePerSecond, dailyKWh);
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [status]);

  useEffect(() => {
    if (progress > 0) {
      onPercentageChange((progress / dailyKWh) * 100);
      onNewText((progress / dailyKWh) * 100);
    }
  }, [progress]);

  const heightPercentage = (progress / dailyKWh) * 100;

  return (
    <div className="relative w-3/4 h-full  bg-gray-200 rounded-2xl overflow-hidden">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        style={{ display: "none" }}
      >
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>
      <div className="box ">
        <div
          className="water"
          style={{
            display: `${
              status || (heightPercentage > 0 && heightPercentage < 100)
                ? "block"
                : "none"
            }`,

            transform: `translateY(${100 - heightPercentage}%)`,
            transition: "transform 0.06s ease-in-out",
          }}
        >
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 text-center p-5 sm:text-xs md:text-sm lg:text-base">
        {progress === dailyKWh ? "MAX" : `${(progress * 1000).toFixed(0)} Wh`}
      </div>
    </div>
  );
};

export default ProgressBar;
