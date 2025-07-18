import { useState, useRef, useEffect } from "react";
import { Pixel } from './Pixel.tsx';
import Toolbar from "./Toolbar.tsx";

function Grid() {
  const DEFAULT_SIZE = 64 * 64;
  const DEFAULT_BACKGROUND_COLOR = 'white';
  const DEFAULT_COLOR = '#F58616';

  const [gridSize, setGridSize] = useState(DEFAULT_SIZE);
  const [colors, setColors] = useState<boxInfo[]>(makeInitialColorsGrid);
  const [currentlySelectedColor, setCurrentlySelectedColor] = useState(DEFAULT_COLOR);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface boxInfo {
    color: string;
    index: number;
  }

  function makeInitialColorsGrid(): boxInfo[] {
    const newGrid = Array.from({ length: gridSize }, (_, i) => ({
      color: DEFAULT_BACKGROUND_COLOR,
      index: i,
    }));
    return newGrid;
  }

  function changePixelColor(selectedIndex: number) {
    setColors((colors) => {
      const newColors = colors.map((box) => {
        if (box.index === selectedIndex) {
          return { ...box, color: currentlySelectedColor };
        } else {
          return { ...box };
        }
      });
      return newColors;
    });
  }

  function handleNewGridSize(newSize: number) {
    setGridSize(newSize);
    resetGridSpecifiedSize(newSize);
  }

  function resetGridSpecifiedSize(newSize: number) {
    const newGrid = Array.from({ length: newSize }, (_, i) => ({
      color: DEFAULT_BACKGROUND_COLOR,
      index: i,
    }));
    setColors(newGrid);
  }

  function handleSelectedColorChange(newColor: string) {
    setCurrentlySelectedColor(newColor);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = Math.sqrt(gridSize) * 20;  // Adjust canvas size
        canvas.height = Math.sqrt(gridSize) * 20; // Adjust canvas size
        const pixelSize = canvas.width / Math.sqrt(colors.length);
        colors.forEach((pixel) => {
          const x = (pixel.index % Math.sqrt(colors.length)) * pixelSize;
          const y = Math.floor(pixel.index / Math.sqrt(colors.length)) * pixelSize;
          ctx.fillStyle = pixel.color;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        });
      }
    }
  }, [colors, gridSize]);

  return (
    <div className="gridContainer">
      <Toolbar 
        handleCanvasSizeChange={handleNewGridSize} 
        handleClearClick={() => resetGridSpecifiedSize(gridSize)} 
        handleSelectedColorChange={handleSelectedColorChange} 
        currentlySelectedColor={currentlySelectedColor} 
        canvasRef={canvasRef}
        canvasSize={Math.sqrt(gridSize) * 20} 
        gridSize={gridSize}
      />
      <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)` }}>
        {colors.map((entry) => (
          <Pixel key={`${entry.index}`} color={entry.color} index={entry.index} handleColorChange={() => changePixelColor(entry.index)} />
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default Grid;
