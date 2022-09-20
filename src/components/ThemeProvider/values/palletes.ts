import { opacify } from 'polished';

import { colors } from './colors';

export type PalleteStructure = typeof lightPalette;

const lightPalette = {
   placeholder: opacify(0.5, colors.blackCoffee),
   card: colors.magicMint,
   body: colors.blackCoffee,
   secondary: colors.celadonBlue,
   accent: colors.celadonBlue,
   bg: colors.robRoy,
   white: colors.white,
   red: colors.red,
};

const darkPalette: PalleteStructure = {
   ...lightPalette,
};

export const palletes: {
   light: PalleteStructure;
   dark: PalleteStructure;
} = {
   dark: darkPalette,
   light: lightPalette,
};
