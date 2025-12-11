import React, { useState, useCallback } from 'react';
import { TestState, TestResults } from './types';
import Speedometer from './components/Speedometer';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';
import InfoIcon from './components/icons/InfoIcon';
import SeoContent from './components/SeoContent';

const App: React.FC = () => {
  const [testState, setTestState] = useState<TestState>(TestState.IDLE);
  const [results, setResults] = useState<TestResults>({ ping: null, download: null, upload: null });
  const [liveSpeed, setLiveSpeed] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PING_COUNT = 5;
  const PING_URL = 'https://speed.cloudflare.com/__down?bytes=0';
  const DOWNLOAD_URL = 'https://speed.cloudflare.com/__down?bytes=25000000'; // 25MB
  const UPLOAD_URL = 'https://speed.cloudflare.com/__up';
  const UPLOAD_DATA_SIZE_MB = 5; // 5MB
  
  const measurePing = async () => {
    let pings: number[] = [];
    for (let i = 0; i < PING_COUNT; i++) {
      const startTime = performance.now();
      try {
        const response = await fetch(`${PING_URL}&_=${Date.now()}`, { method: 'GET', cache: 'no-store' });
        await response.blob();
      } catch (e) {
        console.error('Ping test failed:', e);
        throw new Error('Ping test failed. Could not reach test server.');
      }
      const endTime = performance.now();
      pings.push(endTime - startTime);
      setResults(prev => ({ ...prev, ping: Math.round(pings.reduce((a, b) => a + b, 0) / pings.length) }));
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    return Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
  };

  const measureDownloadSpeed = async () => {
    setLiveSpeed(0);
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${DOWNLOAD_URL}&_=${Date.now()}`);
      if (!response.body) throw new Error("Response body is not available.");

      const reader = response.body.getReader();
      let receivedLength = 0;

      while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          receivedLength += value.length;
          const durationInSeconds = (performance.now() - startTime) / 1000;
          if (durationInSeconds > 0) {
            const speedBps = (receivedLength * 8) / durationInSeconds;
            const speedMbps = speedBps / 1_000_000;
            setLiveSpeed(speedMbps);
          }
      }

      const durationInSeconds = (performance.now() - startTime) / 1000;
      const finalSpeedMbps = (receivedLength * 8 / durationInSeconds) / 1_000_000;
      return finalSpeedMbps;
    } catch (e) {
      console.error('Download test failed:', e);
      throw new Error('Download test failed. Could not fetch data from server.');
    }
  };

  const measureUploadSpeed = async (): Promise<number> => {
    return new Promise((resolve, reject) => {
      setLiveSpeed(0);
      const dataSize = UPLOAD_DATA_SIZE_MB * 1024 * 1024;
      const data = new Blob([new Uint8Array(dataSize)], { type: 'application/octet-stream' });
      const xhr = new XMLHttpRequest();
      const startTime = performance.now();
  
      xhr.open('POST', `${UPLOAD_URL}?_=${Date.now()}`, true);
  
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const durationInSeconds = (performance.now() - startTime) / 1000;
          if (durationInSeconds > 0) {
            const speedBps = (event.loaded * 8) / durationInSeconds;
            const speedMbps = speedBps / 1_000_000;
            setLiveSpeed(speedMbps);
          }
        }
      };
  
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const durationInSeconds = (performance.now() - startTime) / 1000;
          if (durationInSeconds > 0) {
            const speedBps = (dataSize * 8) / durationInSeconds;
            const finalSpeedMbps = speedBps / 1_000_000;
            setLiveSpeed(finalSpeedMbps);
            resolve(finalSpeedMbps);
          } else {
            resolve(0); // Avoid division by zero
          }
        } else {
          reject(new Error(`Upload test failed. Server responded with status ${xhr.status}.`));
        }
      };
  
      xhr.onerror = () => {
        reject(new Error('Upload test failed. Could not send data to the server.'));
      };
      
      xhr.send(data);
    });
  };

  const startTest = useCallback(async () => {
    if (testState !== TestState.IDLE && testState !== TestState.COMPLETE) return;
    
    setTestState(TestState.IDLE);
    setResults({ ping: null, download: null, upload: null });
    setLiveSpeed(0);
    setError(null);
    
    try {
      setTestState(TestState.PING);
      const ping = await measurePing();
      setResults(prev => ({ ...prev, ping }));

      setTestState(TestState.DOWNLOAD);
      const download = await measureDownloadSpeed();
      setResults(prev => ({ ...prev, download }));

      setTestState(TestState.UPLOAD);
      const upload = await measureUploadSpeed();
      setResults(prev => ({ ...prev, upload }));

      setTestState(TestState.COMPLETE);
    } catch (e: any) {
        setError(e.message || 'An unknown error occurred. Please try again.');
        setTestState(TestState.IDLE);
    }
  }, [testState]);

  const isTesting = testState !== TestState.IDLE && testState !== TestState.COMPLETE;

  return (
    <>
      <div className="relative flex flex-col min-h-screen text-white overflow-y-auto">
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-10">
          <div className="flex items-center space-x-3 group cursor-default">
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
              SpeedTester
            </h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm border border-white/5 hover:border-cyan-500/30"
            aria-label="More Information"
          >
            <InfoIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 z-10 space-y-16">
          
          {/* Speedometer Section */}
          <div className="w-full flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[500px]">
             <div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center transition-all duration-500">
              <Speedometer testState={testState} speed={liveSpeed} ping={results.ping} />
              <ResultDisplay results={results} testState={testState}/>

              {error && (
                  <div className="mt-8 text-center bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-xl max-w-md w-full animate-fade-in">
                      <p className="font-semibold flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Test Failed: <span className="font-normal opacity-90">{error}</span>
                      </p>
                  </div>
              )}

              <div className="mt-12">
                <button
                  onClick={startTest}
                  disabled={isTesting}
                  className={`
                    relative group px-16 py-6 rounded-full font-bold text-xl tracking-wider
                    transition-all duration-300 ease-out transform
                    ${isTesting 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95'
                    }
                  `}
                  aria-label={testState === TestState.COMPLETE || error ? 'Restart Speed Test' : 'Start Speed Test'}
                >
                  <span className="relative z-10">
                    {testState === TestState.COMPLETE || error ? 'RESTART TEST' : isTesting ? 'TESTING...' : 'START TEST'}
                  </span>
                  {!isTesting && (
                    <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-cyan-400/50 transition-all duration-500 animate-pulse-slow"></div>
                  )}
                </button>
              </div>
              
              <div className="mt-8 text-center h-6">
                  <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                      {testState === TestState.IDLE ? 'Ready to analyze your network' : 
                       testState === TestState.PING ? 'Measuring Latency...' :
                       testState === TestState.DOWNLOAD ? 'Testing Download Speed...' :
                       testState === TestState.UPLOAD ? 'Testing Upload Speed...' :
                       testState === TestState.COMPLETE ? 'Analysis Complete' : ''}
                  </p>
              </div>
            </div>
          </div>
          
          {/* SEO Content Section */}
          <SeoContent />

        </main>
        
        <Footer />
      </div>
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default App;