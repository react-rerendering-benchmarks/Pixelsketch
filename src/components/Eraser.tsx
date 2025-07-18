import { memo } from "react";
interface EraserProps {
  handleEraserClick: () => void;
}
export const Eraser: React.FC<EraserProps> = memo(({
  handleEraserClick
}) => {
  return <div>
            <button className='eraser' onClick={handleEraserClick}>ERASER</button>
        </div>;
});