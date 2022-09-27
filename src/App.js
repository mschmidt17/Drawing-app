
import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [size, setSize] = useState(10);
  const [isPressed, setIsPressed] = useState(false);
  const [color, setColor] = useState('black');
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const canvasRef = useRef();

  const drawCircle = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    setIsPressed(true);
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  };

  const handleMouseUp = (e) => {
    setIsPressed(false);
    setX(null);
    setY(null);
  };

  const handleMouseMove = (e) => {
    if (isPressed) {
      const ctx = canvasRef.current.getContext('2d');
      const x2 = e.nativeEvent.offsetX;
      const y2 = e.nativeEvent.offsetY;

      drawCircle(ctx, x2, y2);
      drawLine(ctx, x, y, x2, y2);

      setX(x2);
      setY(y2);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        width={800}
        height={680}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleMouseMove(e)}
      />
      <div className="toolbox">
        <button onClick={() => setSize((size) => (size <= 5 ? 5 : size - 5))}>
          -
        </button>
        <span>{size}</span>
        <button onClick={() => setSize((size) => (size >= 50 ? 50 : size + 5))}>
          +
        </button>
        <input type="color" onChange={(e) => setColor(e.target.value)} />
        <button onClick={handleClear}>X</button>
      </div>
    </div>
  );
}

export default App;