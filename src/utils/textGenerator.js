import { HOME_ROW_KEYS } from '../constants/keyConfig';

// Realistic n-grams and patterns specifically for the 8 home row keys
const HOME_ROW_PATTERNS = [
  'asdf jkl; asdf jkl;',
  'fjdk sla; fjdk sla;',
  'all fall asks flask',
  'flash dallas salad fall',
  'sad lad asks dad',
  'glad fall alfalfa falls',
  'jack falls flask lad',
  'alas a sad lad asks',
  'add a dad fall salad',
  'half fall flask dash',
  'a salad for a lad'
];

export const generatePracticeBatch = (level = 'words', count = 12) => {
  if (level === 'basic') {
    // Pure key combinations to build initial muscle memory
    let sequence = [];
    for (let i = 0; i < count; i++) {
      let chunk = '';
      for (let j = 0; j < 4; j++) {
        const randomKey = HOME_ROW_KEYS[Math.floor(Math.random() * HOME_ROW_KEYS.length)];
        chunk += randomKey;
      }
      sequence.push(chunk);
    }
    return sequence.join(' ');
  }

  // Realistic home row words & n-grams
  const shuffled = [...HOME_ROW_PATTERNS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6).join(' ');
};