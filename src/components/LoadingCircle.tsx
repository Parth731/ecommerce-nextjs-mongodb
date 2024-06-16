// LoadingCircle.js
import React from "react";

const LoadingCircle = ({ progress }: { progress: number }) => {
  return (
    <div className="loading-circle text-black">
      <div className="circle">
        <div className="mask full text-black">
          <div
            className="fill"
            style={{ transform: `rotate(${progress * 1.8}deg)` }}
          ></div>
        </div>
        <div className="mask half text-black">
          <div
            className="fill"
            style={{ transform: `rotate(${progress * 1.8}deg)` }}
          ></div>
          <div className="fill fix"></div>
        </div>
      </div>
      <div className="percentage text-black">{progress}%</div>
    </div>
  );
};

export default LoadingCircle;
