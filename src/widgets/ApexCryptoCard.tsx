import React, { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export const ApexCryptoCard: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<'BTC' | 'ETH'>('BTC');
  const [priceData, setPriceData] = useState<number[]>([
    58200, 58350, 58100, 58450, 58300, 58650, 58500, 58800, 58700, 58950
  ]);
  const [price, setPrice] = useState(58950);
  const [changePercent, setChangePercent] = useState(2.45);

  useEffect(() => {
    // Reset data when switching asset
    if (selectedAsset === 'BTC') {
      const baseBTC = [58200, 58350, 58100, 58450, 58300, 58650, 58500, 58800, 58700, 58950];
      setPriceData(baseBTC);
      setPrice(58950);
      setChangePercent(2.45);
    } else {
      const baseETH = [3120, 3110, 3140, 3130, 3160, 3145, 3180, 3175, 3190, 3210];
      setPriceData(baseETH);
      setPrice(3210);
      setChangePercent(3.12);
    }
  }, [selectedAsset]);

  // Real-time ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => {
        const variancePercent = (Math.random() - 0.48) * 0.002; // Slight upward bias
        const delta = prevPrice * variancePercent;
        const newPrice = Math.round((prevPrice + delta) * 100) / 100;
        
        // Update price data array
        setPriceData((prevData) => {
          const updated = [...prevData.slice(1), newPrice];
          return updated;
        });

        // Update percent change slightly
        setChangePercent((prev) => {
          const changeDelta = (Math.random() - 0.5) * 0.05;
          return Math.round((prev + changeDelta) * 100) / 100;
        });

        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Convert points array to SVG path
  const generatePath = (data: number[], width = 300, height = 70) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      // Invert Y because SVG coordinates start from top-left (0,0)
      const y = height - ((val - min) / range) * (height - 10) - 5;
      return { x, y };
    });

    const pathString = points.reduce(
      (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
      ''
    );

    // Area path for gradient fill
    const areaString = `${pathString} L ${width} ${height} L 0 ${height} Z`;

    return { pathString, areaString };
  };

  const { pathString, areaString } = generatePath(priceData);
  const isPositive = changePercent >= 0;

  return (
    <div className="crypto-widget">
      <div>
        <div className="widget-title">
          <TrendingUp size={18} style={{ color: '#f59e0b' }} />
          <span>Project 3: ApexCrypto Analytics</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.5' }}>
          Real-time cryptocurrency analytics tracking sparklines, trend rates, and minimal data tables.
        </p>

        {/* Currency selectors / price info */}
        <div className="crypto-assets-header">
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              className={`filter-chip ${selectedAsset === 'BTC' ? 'active' : ''}`}
              style={selectedAsset === 'BTC' ? { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' } : {}}
              onClick={() => setSelectedAsset('BTC')}
            >
              BTC
            </button>
            <button
              className={`filter-chip ${selectedAsset === 'ETH' ? 'active' : ''}`}
              style={selectedAsset === 'ETH' ? { backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#a5b4fc' } : {}}
              onClick={() => setSelectedAsset('ETH')}
            >
              ETH
            </button>
          </div>

          <div className="crypto-price-block">
            <div className="crypto-value">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`crypto-change ${isPositive ? 'up' : 'down'}`}>
              {isPositive ? '+' : ''}{changePercent}%
            </div>
          </div>
        </div>

        {/* Chart Sparkline */}
        <div className="crypto-chart-container" style={{ marginTop: '1rem' }}>
          <svg className="crypto-svg-chart" viewBox="0 0 300 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedAsset === 'BTC' ? '#f59e0b' : '#6366f1'} stopOpacity="0.2" />
                <stop offset="100%" stopColor={selectedAsset === 'BTC' ? '#f59e0b' : '#6366f1'} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area path */}
            <path className="chart-path-gradient" d={areaString} />
            {/* Line path */}
            <path 
              className="chart-path" 
              d={pathString} 
              stroke={selectedAsset === 'BTC' ? '#f59e0b' : '#6366f1'} 
            />
          </svg>
        </div>

        {/* Technology Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <span className="skill-tag react" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>React</span>
          <span className="skill-tag ts" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>TypeScript</span>
          <span className="skill-tag tailwind" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>SVG Canvas</span>
        </div>
      </div>

      <div className="project-links">
        <a 
          href="https://github.com/kariimmohamed412-svg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link"
        >
          <GithubIcon size={16} />
          <span>Source Code</span>
        </a>
        <a 
          href="https://github.com/kariimmohamed412-svg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link primary"
          style={{ background: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
};
