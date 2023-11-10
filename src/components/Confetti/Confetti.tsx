"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Confeti = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [isClient, setClient] = useState(false);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;

    setDimensions({
      width,
      height,
    });
    setClient(true);
  }, []);

  return (
    isClient && (
      <Confetti
        height={dimensions.height}
        numberOfPieces={500}
        recycle={false}
        width={dimensions.width}
      />
    )
  );
};

export default Confeti;
