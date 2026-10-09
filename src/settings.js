import { DEFAULT_REQUIRED_STREAK } from './model/learning.js';
import { DEFAULT_LANGUAGE } from './i18n/index.js';

export const SETTINGS_KEY = 'de-artikel.settings';

export const DEFAULT_SETTINGS = {
  language: DEFAULT_LANGUAGE,
  requiredStreak: DEFAULT_REQUIRED_STREAK,
};

export const REQUIRED_STREAK_RANGE = { min: 1, max: 10 };
