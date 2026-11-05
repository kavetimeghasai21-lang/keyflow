import { KEYBOARD_LAYOUT, KEY_FINGER_MAPPING, HOME_ROW_KEYS } from '../constants/keyConfig';

export const VirtualKeyboard = ({ targetKey, lastPressedKey }) => {
  return (
    <div className="virtual-keyboard glass-panel">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="kb-row">
          {row.map((key) => {
            const isTarget = targetKey === key;
            const isPressed = lastPressedKey === key;
            const isHomeRow = HOME_ROW_KEYS.includes(key) || key === ' ';
            const fingerInfo = KEY_FINGER_MAPPING[key];

            let classes = ['kb-key'];
            if (isHomeRow) classes.push('home-row');
            if (key === ' ') classes.push('spacebar');
            if (fingerInfo) classes.push(`finger-${fingerInfo.colorClass}`);
            if (isTarget && fingerInfo) classes.push(`target-${fingerInfo.colorClass}`, 'target-key');
            if (isPressed) classes.push('pressed');

            return (
              <div key={key} className={classes.join(' ')}>
                <span>{key === ' ' ? 'SPACE' : key.toUpperCase()}</span>
                {fingerInfo && key !== ' ' && (
                  <span className="finger-label">{fingerInfo.finger.split(' ')[1] || ''}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};