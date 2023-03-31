import { cloneDeep } from 'lodash-es'
import type { Graph } from './graph'
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
export namespace WNode {
  export interface Base {
    type: NodeType
    parent: WNode | null | undefined
    child: WNode | null | undefined
    attrs: BasicNodeAttributes
    conditions?: WNode[]
    graph: Graph
    addChild: (child?: WNode) => WNode
    addCond: () => void
    remove: () => void
  }
}

export type WNodeAttributes = BasicNodeAttributes /* TODO: & */

/**
 * Workflow Node
 */
export class WNode implements WNode.Base {
  type: NodeType
  parent: WNode | null
  child: WNode | null
  attrs: WNodeAttributes
  conditions: WNode[]
  graph: Graph

  constructor(
    options: Partial<WNode> & Pick<WNode, 'type' | 'attrs' | 'graph'>
  ) {
    this.type = options.type
    this.parent = options.parent ?? null
    this.child = options.child ?? null
    this.conditions = options.conditions ?? []
    this.attrs = cloneDeep(options.attrs)
    this.graph = options.graph
  }

  addChild(child?: WNode): WNode {
    return this.graph.addChild(this, child)
  }

  addCond(cond?: WNode): void {
    return this.graph.addCond(this, cond)
  }

  remove(): void {
    this.graph.removeNode(this)
  }
}

export const getNodeTail = (node: WNode): WNode => {
  if (!node.child) return node

  return getNodeTail(node.child)
}

export const findCondIndex = (node: WNode) => {
  if (!node.parent) return -1

  return node.parent.conditions.findIndex(
    (cond) => cond.attrs.id === node.attrs.id
  )
}
/**
 * is Workflow Condition Node
 */
export const isCondNode = (node: WNode): boolean => {
  return findCondIndex(node) > -1
}
