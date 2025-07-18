import { useCallback } from "react";
import { memo } from "react";
import React from 'react';
import CanvasSize from "./CanvasSize";
import { Color } from "./Color";
import { Clear } from "./Clear";
import { Eraser } from "./Eraser";
import Export from './Export';
interface ToolbarProps {
  handleCanvasSizeChange: (newSize: number) => void;
  handleClearClick: () => void;
  handleSelectedColorChange: (newColor: string) => void;
  currentlySelectedColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasSize: number;
  gridSize: number;
}
export const Toolbar: React.FC<ToolbarProps> = memo(({
  handleCanvasSizeChange,
  handleClearClick,
  handleSelectedColorChange,
  currentlySelectedColor,
  canvasRef,
  canvasSize,
  gridSize
}) => {
  return <div className="toolbar">
      <h2>TOOLS</h2>
      <CanvasSize handleCanvasSizeChange={handleCanvasSizeChange} />
      <Eraser handleEraserClick={useCallback(() => handleSelectedColorChange('#FFFFFF'), [])} />
      <Clear handleClearClick={handleClearClick} />
      <Color handleSelectedColorChange={handleSelectedColorChange} currentlySelectedColor={currentlySelectedColor} />
      <Export canvasRef={canvasRef} canvasSize={canvasSize} gridSize={gridSize} />
    </div>;
});
export default Toolbar;