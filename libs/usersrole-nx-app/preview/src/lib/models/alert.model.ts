import { PaletteColors } from '@usersrole-nx/shared';

export type AlertVariants = 'default' | 'filled' | 'outlined';

export type Variant = {
  display: string;
  value: AlertVariants;
};

export type Icon = {
  display: string;
  value: string;
};

export type Alert = {
  id?: string;
  type?: PaletteColors;
};
