import type { NodeType } from './node'

/** property controller type */
export enum SaPluginType {
  Input = 'input',
  Number = 'number',
  Select = 'select',
  Dialog = 'dialog',
  Color = 'color',
  Cascader = 'cascader',
}

export interface SaPlugin {
  /** plugin label */
  label: string
  /** plugin attribute, related to node's attr */
  attr: string
  /** plugin display type */
  type: SaPluginType
  /** plugin full name, used on DOM's title */
  title?: string
  /** dialog component settings, needed when SaPlugin type is `Dialog` */
  dialog?: {
    /** component name */
    component: string
    /** dialog title, set plugin label in default */
    title?: string
  }
  /** value filter for display format data */
  filter?: (value: any) => string
  /** plugin disable option */
  disabled?: boolean
}

export const BasicPlugins = {
  'widget-id': {
    label: 'id',
    attr: 'id',
    type: SaPluginType.Input,
    disabled: true,
  },
  'widget-name': {
    label: 'name',
    attr: 'name',
    type: SaPluginType.Input,
  },
  'widget-background': {
    label: 'BGD',
    title: 'background',
    attr: 'background',
    type: SaPluginType.Color,
  },
} as const

export type SaPluginLayout = {
  [key in NodeType]?: {
    basic?: SaPlugin[]
    extend?: SaPlugin[]
  }
}
