import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledGauge = styled.div`
    position: relative;
    flex: 0 0 calc(60% - var(--spacer));
    margin-left: var(--spacer);
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
        height: 30px;
    }

    output {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 0;
        width: 30px;
        height: 30px;
        background-color: #ccc;
        color: #fff;
        font-style: normal;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: background-color 0.15s ease-in-out;

        .is-active & {
          background-color: var(--black);
        }
    }
`;

interface GaugeProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  callback: (value: number) => void;
}

function Gauge({
  value = 0,
  min = 0,
  max = 10,
  step = 1,
  disabled = false,
  callback,
}: GaugeProps) {
  const [thumbPos, setThumbPos] = useState(0);

  useEffect(() => {
    setThumbPos((Math.max(0, value - min) / (max - min)) * 100);
  }, [value, min, max]);

  function handleChange(e: { target: { value: string; }; }) {
    const val = parseInt(e.target.value);
    callback(val);
  }

  return (
    <StyledGauge>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
      <output style={{ left: `calc(${thumbPos}% + (${8 - thumbPos * 0.15}px))` }}>{value}</output>
    </StyledGauge>
  );
}

export default Gauge;
