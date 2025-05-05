import React from "react";

type TypingIndicatorProps = {};

const TypingIndicator = ({}: TypingIndicatorProps) => {
  return (
    <div className="ticontainer">
      <div className="tiblock">
        <div className="tidot"></div>
        <div className="tidot"></div>
        <div className="tidot"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
