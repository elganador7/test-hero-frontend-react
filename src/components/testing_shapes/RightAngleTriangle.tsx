import React, { useEffect, useRef } from "react";
import JXG from "jsxgraph";

const RightAngleTriangle: React.FC = () => {
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<JXG.Board | null>(null);

  useEffect(() => {
    if (boardContainerRef.current && !boardRef.current) {
      boardRef.current = JXG.JSXGraph.initBoard(boardContainerRef.current.id, {
        boundingbox: [-1, 2, 3, -1],
        axis: false,
        grid: false,
        showNavigation: false,
        showCopyright: false,
      });

      const board = boardRef.current;

      // Define points
      const A = board.create("point", [0, 0], { name: "", visible: false });
      const B = board.create("point", [1, 0], { name: "", visible: false });
      const C = board.create("point", [0, 1.73], { name: "", visible: false }); // tan(60) * base
      
      // Draw triangle
      board.create("polygon", [A, B, C], { borders: { strokeWidth: 2 } });

      // Draw right angle marker
      board.create("polygon", [A, [0.3, 0], [0.3, 0.3], A], {
        borders: { strokeWidth: 2 },
        fillColor: "black",
        highlight: false,
      });

      // Label angles
      board.create("text", [0.15, 1.3, "60°"], { fontSize: 16 });
      board.create("text", [1.5, 0.2, "α"], { fontSize: 16 });
    }
  }, []);

  return <div ref={boardContainerRef} id="jxgbox" style={{ width: "300px", height: "200px" }}></div>;
};

export default RightAngleTriangle;