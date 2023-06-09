import { cloneDeep } from 'lodash-es'
import type { Graph } from './graph'
import type { CSSProperties } from 'vue'

/**
 * ========= tree example ===========
 * ==================================
 *             root
 *              |
 *            route
 *            /   \
 *           |     |
 *          node route
 *           |    / \
 *           | node  node
 *           |    \ /
 *            \   /
 *             end
 * ==================================
 */

/** node types */
export enum NodeType {
  /** tree root */
  Root,
  /** base node */
  Base,
  /** route node */
  Route,
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

export type WNodeAttributes = BasicNodeAttributes /* TODO: & */

/**
 * Workflow Base Node
 */
export class WBase {
  type: NodeType
  parent: WNode | null
  child: WNode | null
  attrs: WNodeAttributes
  graph: Graph

  constructor(
    options: Partial<WNode> & Pick<WNode, 'type' | 'attrs' | 'graph'>
  ) {
    this.type = options.type
    this.parent = options.parent ?? null
    this.child = options.child ?? null
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

  select(): void {
    this.graph.select(this)
  }

  swapWithPrevious(): void {
    const parent = this.parent
    if (!parent || !isRoute(parent)) return

    const index = findCondIndex(this)
    if (index === 0) return

    this.graph.swap(parent, index, index - 1)
  }

  swapWithNext(): void {
    const parent = this.parent
    if (!parent || !isRoute(parent)) return

    const index = findCondIndex(this)
    if (index === parent.conditions.length - 1) return

    this.graph.swap(parent, index, index + 1)
  }
}

export const getNodeTail = (node: WNode): WNode => {
  if (!node.child) return node

  return getNodeTail(node.child)
}

/**
 * Workflow Route Node
 */
export class WRoute extends WBase {
  conditions: WNode[]

  constructor(options: Partial<WRoute> & Pick<WRoute, 'attrs' | 'graph'>) {
    super({
      type: NodeType.Route,
      ...options,
    })

    this.conditions = options.conditions ?? []
  }
}

export const isNodeSelected = (node: WNode): boolean => {
  return node.graph.selected.some(
    (selected) => selected.attrs.id === node.attrs.id
  )
}

export const findCondIndex = (node: WNode) => {
  if (!node.parent || !isRoute(node.parent)) return -1

  return node.parent.conditions.findIndex(
    (cond) => cond.attrs.id === node.attrs.id
  )
}
/**
 * is route
 */
export const isRoute = (node: WNode): node is WRoute => {
  return node.type === NodeType.Route
}

export const isRouteCond = (node: WNode): boolean => {
  const parent = node.parent
  if (!parent || !isRoute(parent)) return false
  return parent.conditions.some((cond) => cond.attrs.id === node.attrs.id)
}

export type WNode = WBase | WRoute

export const getNodeWidth = (node: WNode | null): number => {
  if (!node) return 1

  let max = getNodeWidth(node.child)
  if (isRoute(node)) {
    max = Math.max(
      max,
      node.conditions.reduce((sum, cond) => sum + getNodeWidth(cond), 0)
    )
  }

  return max
}
