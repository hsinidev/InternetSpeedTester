
import React from 'react';
import { TestResults, TestState } from '../types';
import PingIcon from './icons/PingIcon';
import DownloadIcon from './icons/DownloadIcon';
import UploadIcon from './icons/UploadIcon';

interface ResultDisplayProps {
  results: TestResults;
  testState: TestState;
}

const ResultItem: React.FC<{ icon: React.ReactNode; label: string; value: number | null; unit: string; isTesting: boolean; }> = ({ icon, label, value, unit, isTesting }) => (
  <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${isTesting ? 'bg-gray-700/50' : value !== null ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
    <div className={`w-8 h-8 ${isTesting ? 'text-cyan-400 animate-pulse' : 'text-cyan-500'}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      {value !== null ? (
        <p className="text-2xl font-bold text-white">
          {value.toFixed(label === 'Ping' ? 0 : 2)} <span className="text-lg text-gray-300">{unit}</span>
        </p>
      ) : (
        <p className="text-2xl font-bold text-gray-500">-</p>
      )}
    </div>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, testState }) => {
  if (testState === TestState.IDLE) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
      <ResultItem icon={<PingIcon />} label="Ping" value={results.ping} unit="ms" isTesting={testState === TestState.PING} />
      <ResultItem icon={<DownloadIcon />} label="Download" value={results.download} unit="Mbps" isTesting={testState === TestState.DOWNLOAD} />
      <ResultItem icon={<UploadIcon />} label="Upload" value={results.upload} unit="Mbps" isTesting={testState === TestState.UPLOAD} />
    </div>
  );
};

export default ResultDisplay;
