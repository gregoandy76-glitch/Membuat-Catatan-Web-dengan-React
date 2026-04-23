import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState('idle'); // idle | covering | revealing
  const pendingChildren = useRef(null);

  useEffect(() => {
    pendingChildren.current = children;
    setStage('covering');
  }, [location.pathname]);

  function handleCurtainMidpoint() {
    if (pendingChildren.current) {
      setDisplayChildren(pendingChildren.current);
      pendingChildren.current = null;
    }
    setStage('revealing');
  }

  function handleAnimationEnd() {
    if (stage === 'revealing') setStage('idle');
  }

  return (
    <div className="page-wrapper">
      {displayChildren}
      {stage !== 'idle' && (
        <div
          className={`curtain ${stage}`}
          onAnimationEnd={stage === 'covering' ? handleCurtainMidpoint : handleAnimationEnd}
        />
      )}
    </div>
  );
}
