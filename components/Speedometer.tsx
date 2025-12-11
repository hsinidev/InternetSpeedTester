
import React from 'react';
import { TestState } from '../types';

interface SpeedometerProps {
  speed: number;
  ping: number | null;
  testState: TestState;
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed, ping, testState }) => {
  const MAX_SPEED_MBPS = 250; // The top speed on the dial
  const MIN_ANGLE = -90;
  const MAX_ANGLE = 90;

  const speedToAngle = (s: number) => {
    if (s <= 0) return MIN_ANGLE;
    // Use a logarithmic scale for better visualization of a wide range of speeds
    const logSpeed = Math.log10(s + 1);
    const maxLogSpeed = Math.log10(MAX_SPEED_MBPS + 1);
    const percentage = logSpeed / maxLogSpeed;
    const angle = MIN_ANGLE + percentage * (MAX_ANGLE - MIN_ANGLE);
    return Math.min(angle, MAX_ANGLE);
  };

  const angle = speedToAngle(speed);

  const getLabelAndUnit = () => {
    switch (testState) {
      case TestState.PING:
        return { label: 'Ping', unit: 'ms', value: ping?.toFixed(0) || '...' };
      case TestState.DOWNLOAD:
        return { label: 'Download', unit: 'Mbps', value: speed.toFixed(2) };
      case TestState.UPLOAD:
        return { label: 'Upload', unit: 'Mbps', value: speed.toFixed(2) };
      default:
        return { label: 'Speed', unit: 'Mbps', value: '0.00' };
    }
  };

  const { label, unit, value } = getLabelAndUnit();

  const dialTicks = [0, 10, 25, 50, 100, 250];

  return (
    <div className="relative w-full max-w-md aspect-[2/1] overflow-hidden">
      <svg viewBox="0 0 240 120" className="w-full h-full">
        {/* Gauge background arc */}
        <path
          d="M 20 115 A 100 100 0 0 1 220 115"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Gauge progress arc */}
        {testState !== TestState.IDLE && testState !== TestState.PING && (
           <path
              d="M 20 115 A 100 100 0 0 1 220 115"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={Math.PI * 100}
              strokeDashoffset={Math.PI * 100 * (1 - (angle - MIN_ANGLE) / 180)}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
           />
        )}
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
        </defs>

        {/* Dial Ticks */}
        {dialTicks.map((tickSpeed) => {
            const tickAngle = speedToAngle(tickSpeed);
            const x1 = 120 + 90 * Math.sin(tickAngle * Math.PI / 180);
            const y1 = 115 - 90 * Math.cos(tickAngle * Math.PI / 180);
            const x2 = 120 + 110 * Math.sin(tickAngle * Math.PI / 180);
            const y2 = 115 - 110 * Math.cos(tickAngle * Math.PI / 180);
            const tx = 120 + 120 * Math.sin(tickAngle * Math.PI / 180);
            const ty = 115 - 120 * Math.cos(tickAngle * Math.PI / 180);
            
            return (
                <g key={tickSpeed}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
                    <text x={tx} y={ty} textAnchor="middle" alignmentBaseline="middle" fill="rgba(255, 255, 255, 0.7)" fontSize="10">
                        {tickSpeed}
                    </text>
                </g>
            )
        })}


        {/* Needle */}
        <g transform={`rotate(${angle}, 120, 115)`} style={{ transition: 'transform 0.5s ease-out' }}>
          <path d="M 120 115 L 120 20" stroke="#fefefe" strokeWidth="2" strokeLinecap="round" />
          <circle cx="120" cy="115" r="5" fill="#fefefe" />
        </g>
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{value}</span>
        <span className="text-xl md:text-2xl text-gray-400 ml-2">{unit}</span>
        <p className="text-xl md:text-2xl text-cyan-400 font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default Speedometer;
