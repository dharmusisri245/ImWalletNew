/**
 * theme/colors.ts
 * Central design tokens for the Vendor/Shop Registration flow.
 * Keeping these in one place makes it trivial to re-skin the module
 * or plug into a global ImWallet theme provider later.
 */
export const colors = {
  background: '#F6F3FB',
  surface: '#FFFFFF',
  primary: '#5B3E96',
  primaryDark: '#432C74',
  primaryLight: '#8B6FC2',
  gradientStart: '#6C4BA6',
  gradientEnd: '#432C74',

  textPrimary: '#1A1626',
  textLabel: '#8C8698',
  textPlaceholder: '#B7B2C4',
  border: '#DAD4E8',
  borderFocused: '#5B3E96',

  error: '#E5484D',
  errorBg: '#FDECEC',
  success: '#1FA35E',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(20, 14, 33, 0.45)',
  disabled: '#EDEAF5',
  chipBg: '#EFE9FA',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 18,
  pill: 999,
};

export const typography = {
  label: 13,
  input: 16,
  title: 20,
  button: 16,
  helper: 12,
};

export default colors;