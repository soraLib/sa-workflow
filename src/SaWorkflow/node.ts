import Ref from 'vue'
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
  /**
   * @deprecated
   *
   * condition node, used at the beginning of a branch
   *
   */
  Condition, // TODO: remove
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
  child: BasicNode | null
  attrs: BasicNodeAttributes
  conditions?: WCondNode[]
  graph: Graph
  addChild: (child?: WNode) => WNode
  addBranch: () => void
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
    return this.graph.addChild(child, this)
  }

  addBranch(): void {
    return this.graph.addBranch(this)
  }
}

/**
 * Workflow Condition Node
 */
export class WCondNode extends WNode {
  type = NodeType.Condition
}
