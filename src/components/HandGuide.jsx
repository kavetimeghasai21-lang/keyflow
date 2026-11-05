import { KEY_FINGER_MAPPING } from '../constants/keyConfig';

export const HandGuide = ({ targetKey }) => {
  const targetInfo = KEY_FINGER_MAPPING[targetKey] || KEY_FINGER_MAPPING[' '];

  const leftHandFingers = [
    { key: 'a', finger: 'Pinky', hex: '#f43f5e' },
    { key: 's', finger: 'Ring', hex: '#f97316' },
    { key: 'd', finger: 'Middle', hex: '#eab308' },
    { key: 'f', finger: 'Index', hex: '#3b82f6' },
  ];

  const rightHandFingers = [
    { key: 'j', finger: 'Index', hex: '#3b82f6' },
    { key: 'k', finger: 'Middle', hex: '#eab308' },
    { key: 'l', finger: 'Ring', hex: '#f97316' },
    { key: ';', finger: 'Pinky', hex: '#f43f5e' },
  ];

  return (
    <div className="hand-guide-panel glass-panel">
      <div className="hand-guide-header">
        <span>Hand Placement & Muscle Memory Guide</span>
        <span style={{ color: targetInfo.hex, fontWeight: 700 }}>
          Next: Press <kbd style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{targetKey === ' ' ? 'SPACE' : targetKey.toUpperCase()}</kbd> with {targetInfo.finger}
        </span>
      </div>

      <div className="hands-layout">
        {/* Left Hand */}
        <div className="hand-card">
          <h4>Left Hand</h4>
          <div className="fingers-list">
            {leftHandFingers.map((item) => {
              const isActive = targetKey === item.key;
              return (
                <div
                  key={item.key}
                  className={`finger-pill ${isActive ? 'active' : ''}`}
                  style={{ borderBottom: `3px solid ${item.hex}` }}
                >
                  <span className="key-symbol" style={{ color: isActive ? '#fff' : item.hex }}>
                    {item.key.toUpperCase()}
                  </span>
                  <span>{item.finger}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thumbs / Spacebar */}
        <div
          className={`finger-pill ${targetKey === ' ' ? 'active' : ''}`}
          style={{
            borderBottom: '3px solid #a855f7',
            padding: '8px 18px',
            alignSelf: 'center',
          }}
        >
          <span className="key-symbol" style={{ color: targetKey === ' ' ? '#fff' : '#a855f7' }}>
            SPACE
          </span>
          <span>Both Thumbs</span>
        </div>

        {/* Right Hand */}
        <div className="hand-card">
          <h4>Right Hand</h4>
          <div className="fingers-list">
            {rightHandFingers.map((item) => {
              const isActive = targetKey === item.key;
              return (
                <div
                  key={item.key}
                  className={`finger-pill ${isActive ? 'active' : ''}`}
                  style={{ borderBottom: `3px solid ${item.hex}` }}
                >
                  <span className="key-symbol" style={{ color: isActive ? '#fff' : item.hex }}>
                    {item.key === ';' ? ';' : item.key.toUpperCase()}
                  </span>
                  <span>{item.finger}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};