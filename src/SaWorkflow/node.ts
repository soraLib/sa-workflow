import { cloneDeep } from 'lodash-es'
import type { CSSProperties } from 'vue'

/**
 * ========= tree example ===========
 * ==================================
 *            root
 *            /   \
 *           if   if
 *           |     |
 *          node  node
 *           |    / \
 *           |  if   if
 *           |   |   |
 *           | node  node
 *           |    \ /
 *           |     |
 *            \   /
 *             end
 * ==================================
 */

/** node types */
export enum NodeType {
  /** tree root */
  Root = 1,
  /** condition node, used at the beginning of a branch */
  Condition,
  /** normal node */
  Node,
}

/** basic node attributes */
export interface BasicNodeAttributes {
  /** unique id */
  id: string
  /** unique name */
  name: string
  /** node background color */
  background?: CSSProperties['background']
}

/** basic node */
export interface BasicNode {
  type: NodeType
  parent: BasicNode | null
  attrs: BasicNodeAttributes
  conditions?: WCondNode[]
}

export type WNodeAttributes = BasicNodeAttributes /* TODO: & */

/**
 * Workflow Node
 */
export class WNode implements BasicNode {
  type: NodeType
  parent: WNode | null
  child: WNode | null
  attrs: WNodeAttributes
  conditions: WCondNode[]

  constructor(options: Partial<WNode> & Pick<WNode, 'type' | 'attrs'>) {
    this.type = options.type
    this.parent = options.parent ?? null
    this.child = options.child ?? null
    this.conditions = options.conditions ?? []
    this.attrs = cloneDeep(options.attrs)
  }
}

/**
 * Workflow Condition Node
 */
export class WCondNode implements BasicNode {
  type = NodeType.Condition
  parent: WNode | null
  child: WNode | null
  attrs: WNodeAttributes
  conditions: WCondNode[]

  constructor(options: Partial<WCondNode> & Pick<WCondNode, 'type' | 'attrs'>) {
    this.type = options.type
    this.parent = options.parent ?? null
    this.child = options.child ?? null
    this.conditions = options.conditions ?? []
    this.attrs = cloneDeep(options.attrs)
  }
}
