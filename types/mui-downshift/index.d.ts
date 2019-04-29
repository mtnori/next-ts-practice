import React from 'react';
import { DownshiftProps } from 'downshift';
import { BaseTextFieldProps } from '@material-ui/core/TextField';

declare module 'mui-downshift' {
  export interface InputProps extends BaseTextFieldProps {}

  export interface MuiDownshiftProps extends DownshiftProps<Item> {
    items: Array<Item>;
    getListItem?: Function;
    getListItemKey?: Function;
    getInputProps?: () => InputProps;
    showEmpty?: boolean;
    disabled?: boolean;
    includeFooter?: boolean;
    getInfiniteLoaderProps?: Function;
    getVirtualListProps?: Function;
    getRootProps?: Function;
    menuItemCount?: number;
    menuHeight?: number;
    loading?: boolean;
    focusOnClear?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
    inputRef?: (node: any) => void;
  }

  declare const MuiDownshift: React.ComponentType<MuiDownshiftProps>;

  export default MuiDownshift;
}
