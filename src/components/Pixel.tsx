import { memo } from "react";
interface PixelProps {
  color: string;
  index: number;
  handleColorChange: (index: number) => void;
}
export const Pixel: React.FC<PixelProps> = memo(({
  color,
  index,
  handleColorChange
}) => {
  function handleMouseDown() {
    handleColorChange(index);
  }

  // *** to do : implement logic for not just clicking but dragging mouse over *** 
  return <div className="pixel" onMouseDown={handleMouseDown}
  // onClick={hoverOver}
  // onMouseEnter={hoverOver}
  // onMouseLeave={hoverOver}
  style={{
    backgroundColor: color
  }}></div>;
});