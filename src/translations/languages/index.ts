import { en } from './en';
import { ar } from './ar';
import { bg } from './bg';
import { cn } from './cn';
import { cz } from './cz';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { gr } from './gr';
import { hu } from './hu';
import { id } from './id';
import { it } from './it';
import { jp } from './jp';
import { kr } from './kr';
import { nl } from './nl';
import { pl } from './pl';
import { pt } from './pt';
import { ro } from './ro';
import { ru } from './ru';
import { sk } from './sk';
import { th } from './th';
import { tr } from './tr';
import { uk } from './uk';
import { vn } from './vn';
import { zh } from './zh';
import { zhHant } from './zh-hant';

export type Language = 'en' | 'ar' | 'bg' | 'cn' | 'cz' | 'de' | 'es' | 'fr' | 'gr' | 'hu' | 'id' | 'it' | 'jp' | 'kr' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'sk' | 'th' | 'tr' | 'uk' | 'vn' | 'zh' | 'zh-hant';

export const translations = {
    en,
    ar,
    bg,
    cn,
    cz,
    de,
    es,
    fr,
    gr,
    hu,
    id,
    it,
    jp,
    kr,
    nl,
    pl,
    pt,
    ro,
    ru,
    sk,
    th,
    tr,
    uk,
    vn,
    zh,
    'zh-hant': zhHant
} as const; 