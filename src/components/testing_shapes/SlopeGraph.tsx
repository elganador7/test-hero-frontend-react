import React, { useEffect, useRef } from "react";
import JXG from "jsxgraph";

const SlopeGraph: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<JXG.Board | null>(null);

  useEffect(() => {
    if (boardContainerRef.current && !boardRef.current) {
      boardRef.current = JXG.JSXGraph.initBoard(boardContainerRef.current.id, {
        boundingbox: [-5, 5, 5, -5],
        axis: true,
        grid: true,
        showNavigation: false,
        showCopyright: false,
      });

      const board = boardRef.current;

      // Define points
      const A = board.create("point", [-3, -2], { name: "A", size: 3 });
      const B = board.create("point", [2, 3], { name: "B", size: 3 });
      
      // Draw line
      board.create("line", [A, B], { strokeWidth: 2 });
      
      // Label slope formula
      board.create("text", [0, 4, "Slope = (y₂ - y₁) / (x₂ - x₁)"], { fontSize: 16 });
    }
  }, []);

  return <div ref={boardContainerRef} id="jxgbox" style={{ width: "400px", height: "400px" }}></div>;
};

export default SlopeGraph;
