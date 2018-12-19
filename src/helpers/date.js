// Vendors
import {
  formatDistance as _formatDistance,
  formatDistanceStrict as _formatDistanceStrict,
  formatRelative as _formatRelative,
} from 'date-fns';
import {
  enGB as en,
  ru,
} from 'date-fns/locale';
import {format as _format} from 'date-fns-tz';
// Helpers
import {getLocale} from 'src/helpers/locale';

const _localeNameMappings = {
  en,
  ru,
};

const _loadLocale = (locale = getLocale()) => _localeNameMappings[locale];

export const format = (
  date,
  formatStyle,
  options = {},
) => _format(
  date,
  formatStyle,
  {
    locale: _loadLocale(),
    ...options,
  },
);

export const formatRelative = (
  date,
  baseDate,
  options = {},
) => _formatRelative(
  date,
  baseDate,
  {
    locale: _loadLocale(),
    ...options,
  },
);

export const formatDistanceStrict = (
  date,
  baseDate,
  options = {},
) => _formatDistanceStrict(
  date,
  baseDate,
  {
    locale: _loadLocale(),
    ...options,
  },
);

export const formatDistance = (
  date,
  baseDate,
  options = {},
) => _formatDistance(
  date,
  baseDate,
  {
    locale: _loadLocale(),
    ...options,
  },
);
