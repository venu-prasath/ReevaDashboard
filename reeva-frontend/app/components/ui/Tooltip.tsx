"use client";

import React, { useState } from "react";

type TooltipProps = {
  text: string;
  //   position: "top" | "bottom" | "left" | "right";
};

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: "absolute",
          bottom: "100%",
          right: "50%",
          transform: "translateX(50%)",
          marginBottom: "8px",
          padding: "8px",
          backgroundColor: "#333",
          color: "white",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        {showTooltip && text}
      </div>
    </>
  );
};
export default Tooltip;
