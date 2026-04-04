import React, { useMemo } from 'react';

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 6,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      x1: (Math.random() - 0.5) * 100,
      y1: -(Math.random() * 120),
      x2: (Math.random() - 0.5) * 80,
      y2: -(Math.random() * 200),
      x3: (Math.random() - 0.5) * 100,
      y3: -(Math.random() * 60),
    })), []);

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--x1': `${p.x1}px`,
            '--y1': `${p.y1}px`,
            '--x2': `${p.x2}px`,
            '--y2': `${p.y2}px`,
            '--x3': `${p.x3}px`,
            '--y3': `${p.y3}px`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function NetworkNodes() {
  const nodes = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dx: (Math.random() - 0.5) * 80,
      dy: (Math.random() - 0.5) * 60,
      delay: Math.random() * 5,
    })), []);

  return (
    <div className="network-canvas">
      {nodes.map(n => (
        <div
          key={n.id}
          className="network-node"
          style={{
            left: n.left,
            top: n.top,
            '--dx': `${n.dx}px`,
            '--dy': `${n.dy}px`,
            '--delay': `${n.delay}s`,
            animationDelay: `${n.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function RisingOrbs() {
  const orbs = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 30 + Math.random() * 80,
      delay: Math.random() * 8,
    })), []);

  return (
    <div className="orbs-container">
      {orbs.map(o => (
        <div
          key={o.id}
          className="orb"
          style={{
            left: o.left,
            bottom: '-20%',
            width: o.size,
            height: o.size,
            '--delay': `${o.delay}s`,
            animationDelay: `${o.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function GeometricShapes() {
  const shapes = useMemo(() => {
    const types = ['geo-triangle', 'geo-square', 'geo-hexagon'];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: types[i % 3],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 6,
    }));
  }, []);

  return (
    <div className="geo-container">
      {shapes.map(s => (
        <div
          key={s.id}
          className={`geo-shape ${s.type}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            '--delay': `${s.delay}s`,
            animationDelay: `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function HeroBackground({ type }: { type: string }) {
  switch (type) {
    case 'particles': return <Particles />;
    case 'network': return <NetworkNodes />;
    case 'orbs': return <RisingOrbs />;
    case 'geometric': return <GeometricShapes />;
    default: return <Particles />;
  }
}
