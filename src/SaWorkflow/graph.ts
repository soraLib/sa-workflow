import { cloneDeep } from 'lodash-es'
import { isNullish } from '@sa/utils'
import { NodeType, WNode, findCondIndex, getNodeTail, isCondNode } from './node'
import type { DeepPartial } from '@sa/utils'
import type { InjectionKey, Ref } from 'vue'
import type { BasicNodeAttributes } from './node'
import type { BasicRecord, BasicRecordStore } from './record'

export const GRAPH_INJECTION_KEY: InjectionKey<Ref<Graph>> = Symbol('graph')

const bindParentChild = (parent: WNode, child: WNode | null): void => {
  parent.child = child
  if (child) child.parent = parent
}

export namespace Graph {
  export type Direction = 'horizontal' | 'vertical'
  export interface Base {
    /** graph root node, contain all nodes here */
    root: WNode
    /** record histories */
    // TODO: history: BasicRecordStore
    /** current selected nodes */
    selected: WNode[]
    /** graph display direction, default is vertical */
    direction: Direction
    getNextId(): string
    /** create a new node */
    createNode(node?: DeepPartial<WNode>): WNode
    /** just create a new node, skip binding parent and child */
    createNodeOnly(node?: WNode): WNode
    /** add a child and return its parent */
    addChild(parent?: WNode, child?: WNode): WNode
    // TODO: addChild(parent?: string, child?: WNode): WNode
    // add a branch on node (not root)
    addCond(parent?: WNode, cond?: WNode): void
    // remove a node
    removeNode(node: WNode): void

    updateElemData(
      id: string,
      data: Partial<WNode['attrs']>,
      needRecord?: boolean
    ): WNode | undefined
    updateElemData(
      element: WNode,
      data: Partial<WNode['attrs']>,
      needRecord?: boolean
    ): WNode | undefined
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

  createNodeOnly(
    node?: Partial<Omit<WNode, 'attrs'>> & DeepPartial<Pick<WNode, 'attrs'>>
  ): WNode {
    return new WNode({
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
  }

  createNode(
    node?: Partial<Omit<WNode, 'attrs'>> & DeepPartial<Pick<WNode, 'attrs'>>
  ): WNode {
    const createdNode = this.createNodeOnly(node)

    if (node?.parent) bindParentChild(node.parent, createdNode)
    if (node?.child) bindParentChild(createdNode, node.child)

    return createdNode
  }

  createCond(
    node?: Partial<Omit<WNode, 'attrs'>> & DeepPartial<Pick<WNode, 'attrs'>>
  ): WNode {
    const createdNode = this.createNodeOnly(node)

    if (node?.child) bindParentChild(createdNode, node.child)

    return createdNode
  }

  addChild(parent: WNode, child?: WNode): WNode {
    if (!child) child = this.createNode()

    if (parent.conditions) {
      child.conditions = parent.conditions
      parent.conditions = []

      for (const cond of child.conditions) {
        cond.parent = child
      }
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

  addCond(node: WNode, cond?: WNode): void {
    const parent = node.parent
    if (!parent) return
    if (!cond) cond = this.createCond()

    cond.parent = parent

    if (parent.conditions?.length) {
      parent.conditions.splice(
        parent.conditions.findIndex((cond) => cond.attrs.id === node.attrs.id) +
          1,
        0,
        cond
      )
    } else {
      const nodeChild = node.child
      node.child = null
      bindParentChild(parent, nodeChild)
      parent.conditions = [node, cond]
    }
  }

  removeNode(node: WNode): void {
    // the root node cannot be removed.
    if (node.type === NodeType.Root) return

    const parent = node.parent
    if (!parent) return

    const index = findCondIndex(node)

    if (index > -1) {
      if (node.child) {
        parent.conditions.splice(index, 1, node.child)
        node.child.parent = parent
      } else {
        parent.conditions.splice(index, 1)
      }

      if (parent.conditions.length === 1) {
        const headCond = parent.conditions[0]
        parent.conditions = []
        const tail = getNodeTail(headCond)

        const parentChild = parent.child
        bindParentChild(parent, headCond)
        bindParentChild(tail, parentChild)
      }
    } else {
      bindParentChild(parent, node.child)
    }

    if (node.conditions.length) {
      parent.conditions = [...node.conditions]
      for (const cond of parent.conditions) {
        cond.parent = parent
      }
    }
  }

  updateElemData(
    id: string,
    data: Partial<BasicNodeAttributes>,
    needRecord?: boolean | undefined
  ): WNode | undefined
  updateElemData(
    element: WNode,
    data: Partial<BasicNodeAttributes>,
    needRecord?: boolean | undefined
  ): WNode | undefined
  updateElemData(
    element: unknown,
    data: unknown,
    needRecord?: unknown
  ): WNode | undefined {
    throw new Error('Method not implemented.')
  }
  historyTo(to: number): void
  historyTo(to: BasicRecord): void
  historyTo(to: unknown): void {
    throw new Error('Method not implemented.')
  }
}
