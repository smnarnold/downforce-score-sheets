import { useState, useEffect } from "react";
import styled from "styled-components";

const Range = styled.div`
    position: relative;
    flex: 0 0 calc(60% - var(--fz));
    margin-left: var(--fz);
    background: linear-gradient(
        to right,
        transparent 2%,
        rgba(0, 0, 0, 0.2) 3%,
        transparent 4%,
        transparent 21%,
        rgba(0, 0, 0, 0.2) 22%,
        transparent 23%,
        transparent 40%,
        rgba(0, 0, 0, 0.2) 41%,
        transparent 42%,
        transparent 59%,
        rgba(0, 0, 0, 0.2) 60%,
        transparent 61%,
        transparent 78%,
        rgba(0, 0, 0, 0.2) 79%,
        transparent 80%,
        transparent 96%,
        rgba(0, 0, 0, 0.2) 97%,
        transparent 98%
    );

    input {
        display: block;
        width: 100%;
        height: 1.75em;
    }

    output {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 0;
        width: 1.75em;
        height: 1.75em;
        background-color: var(--black);
        color: #fff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    &--checked {
        opacity: 1;
    }
`;

function Gauge({
  value = 0,
  min = 0,
  max = 10,
  step = 1,
  disabled = false,
  callback,
}) {
  const [thumbPos, setThumbPos] = useState(0);

  useEffect(() => {
    setThumbPos((Math.max(0, value - min) / (max - min)) * 100);
  }, [value, min, max]);

  function handleChange(e) {
    const val = parseInt(e.target.value);
    callback(val);
  }

  return (
    <Range className="gauge">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
      <output style={{ left: `${thumbPos}%` }}>{value}</output>
    </Range>
  );
}

export default Gauge;
