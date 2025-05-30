import { en } from './languages/en';
import { ar } from './languages/ar';
import { bg } from './languages/bg';

export const translations = {
    en,
    ar,
    bg
};

export type Language = keyof typeof translations; 