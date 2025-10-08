import React, { useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button className="bg-blue-700 text-white" onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
