import { cloneDeep } from 'lodash-es'
import { isNullish } from '@sa/utils'
import { NodeType, WNode } from './node'
import type { DeepPartial } from '@sa/utils'
import type { InjectionKey, Ref } from 'vue'
import type { BasicNode, BasicNodeAttributes, WCondNode } from './node'
import type { BasicRecord, BasicRecordStore } from './record'

export const GRAPH_INJECTION_KEY: InjectionKey<Ref<Graph>> = Symbol('graph')

const bindParentChild = (parent: BasicNode, child: BasicNode): void => {
  parent.child = child
  child.parent = parent
}

export namespace Graph {
  export type Direction = 'horizontal' | 'vertical'
  export interface Base {
    /** graph root node, contain all nodes here */
    root: BasicNode
    /** record histories */
    // TODO: history: BasicRecordStore
    /** current selected nodes */
    selected: BasicNode[]
    /** graph display direction, default is vertical */
    direction: Direction
    getNextId(): string

    /** create a new node */
    createNode(node?: DeepPartial<BasicNode>): BasicNode

    /** add a child and return its parent */
    addChild(child: BasicNode | undefined, parent?: BasicNode): BasicNode
    // TODO: addChild(child: BasicNode, parent?: string): BasicNode

    // add a branch on node (not root)
    addBranch(node: BasicNode): void

    updateElemData(
      id: string,
      data: Partial<BasicNode['attrs']>,
      needRecord?: boolean
    ): BasicNode | undefined
    updateElemData(
      element: BasicNode,
      data: Partial<BasicNode['attrs']>,
      needRecord?: boolean
    ): BasicNode | undefined
    historyTo(to: number): void
    historyTo(to: BasicRecord): void
  }
}

export class Graph implements Graph.Base {
  root: WNode
  direction: Graph.Direction
  selected: WNode[] = []
  nextId: string;
  [key: string]: unknown
  // TODO: history

  constructor(options?: { root?: WNode; direction?: Graph.Direction }) {
    this.direction = options?.direction ?? 'vertical'
    this.nextId = '0'
    this.root = options?.root ?? this.createNode()
    this.selected = [this.root]
  }

  switchDirection(): Graph.Direction {
    return (this.direction =
      this.direction === 'horizontal' ? 'vertical' : 'horizontal')
  }

  getNextId() {
    const nextId = this.nextId
    this.nextId = String(Number(this.nextId) + 1) // update next id
    return nextId
  }

  createNode(
    node?: Partial<Omit<WNode, 'attrs'>> & DeepPartial<Pick<WNode, 'attrs'>>
  ): WNode {
    const createdNode = new WNode({
      graph: node?.graph ?? this,
      type: node?.type ?? NodeType.Node,
      parent: node?.parent,
      child: node?.child,
      conditions: node?.conditions,
      attrs: {
        ...(node?.attrs ?? {}),
        id: node?.attrs?.id ?? this.getNextId(),
        name: node?.attrs?.name ?? 'New Node',
      },
    })

    if (node?.parent && node.type !== NodeType.Condition)
      bindParentChild(node.parent, createdNode)
    if (node?.child) bindParentChild(createdNode, node.child)

    return createdNode
  }

  addChild(child: WNode | undefined, parent: WNode): WNode {
    if (isNullish(child)) child = this.createNode()

    if (parent.conditions) {
      child.conditions = parent.conditions
      parent.conditions = []
    }

    if (!parent.child) {
      bindParentChild(parent, child)
      return parent
    }

    const originalChild = parent.child
    bindParentChild(parent, child)
    bindParentChild(child, originalChild)
    return parent
  }

  addBranch(node: WNode): void {
    if (!node.parent) return

    if (node.parent.conditions?.length) {
      node.parent.conditions.splice(
        node.conditions.findIndex((cond) => cond.attrs.id === node.attrs.id),
        0,
        this.createNode({ type: NodeType.Condition, parent: node.parent })
      )
    } else {
      node.parent.child = node.child
      node.type = NodeType.Condition
      node.parent.conditions = [
        node,
        this.createNode({ type: NodeType.Condition, parent: node.parent }),
      ]
    }
  }

  updateElemData(
    id: string,
    data: Partial<BasicNodeAttributes>,
    needRecord?: boolean | undefined
  ): BasicNode | undefined
  updateElemData(
    element: BasicNode,
    data: Partial<BasicNodeAttributes>,
    needRecord?: boolean | undefined
  ): BasicNode | undefined
  updateElemData(
    element: unknown,
    data: unknown,
    needRecord?: unknown
  ): BasicNode | undefined {
    throw new Error('Method not implemented.')
  }
  historyTo(to: number): void
  historyTo(to: BasicRecord): void
  historyTo(to: unknown): void {
    throw new Error('Method not implemented.')
  }
}
