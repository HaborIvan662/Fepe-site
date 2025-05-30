import { en } from './en';
import { ar } from './ar';
import { bg } from './bg';
import { cn } from './cn';
import { cz } from './cz';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { pl } from './pl';
import { pt } from './pt';
import { ro } from './ro';
import { ru } from './ru';
import { tr } from './tr';
import { kr } from './kr';
import { nl } from './nl';
import {el} from './el';
import {hu} from './hu';
import {id} from './id';
import {jp} from './jp';
import {sk} from './sk';
import {th} from './th';
import {uk} from './uk';
import {vn} from './vn';
import {zhHant} from './zh-hant';

export type Language = 'en' | 'ar' | 'bg' | 'cn' | 'cz' | 'de' | 'es' | 'fr' | 'it' | 'pl' | 'pt' | 'ro' | 'ru' | 'tr' | 'kr' | 'nl' | 'el' | 'hu' | 'id' | 'jp' | 'sk' | 'th' | 'uk' | 'vn' | 'zhHant';

export const translations = {
    en,
    ar,
    bg,
    cn,
    cz,
    de,
    es,
    el,
    fr,
    it,
    id,
    hu,
    jp,
    sk,
    th,
    uk,
    vn,
    zhHant,
    kr,
    nl,
    pl,
    pt,
    ro,
    ru,
    tr,


} as const; 