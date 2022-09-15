import { opacify } from 'polished'

export const colors = {
  robRoy: '#ECCB78',
  blackCoffee: '#362C28',
  celadonBlue: '#377CA3',
  magicMint: '#B7FDDA',
  white: '#FFFFFF',
  red: '#FF0000',
}

export const palette = {
  placeholder: opacify(0.5, colors.blackCoffee),
  card: colors.magicMint,
  body: colors.blackCoffee,
  secondary: colors.celadonBlue,
  accent: colors.celadonBlue,
  bg: colors.robRoy,
  white: colors.white,
  red: colors.red,
}

export const theme = {
  dark: palette,
  light: palette,
}

export type Theme = typeof palette
