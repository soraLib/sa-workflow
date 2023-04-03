import { cloneDeep } from 'lodash-es'
import {
  NodeType,
  WRoute,
  findCondIndex,
  getNodeTail,
  isRoute,
  isRouteCond,
} from './node'
import type { DeepPartial } from '@sa/utils'
import type { InjectionKey, Ref } from 'vue'
import type { BasicNodeAttributes, WBase, WNode } from './node'
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
    /** add a branch on node (not root) */
    addCond(parent?: WNode, cond?: WNode): void
    /** remove a node */
    removeNode(node: WNode): void
    /** swap the two given positions of child Node under a Route */
    swap(route: WRoute, pos1: number, pos2: number): void
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

  createNodeOnly<T = WBase>(
    node?: Partial<Omit<WRoute, 'attrs'>> & DeepPartial<Pick<WRoute, 'attrs'>>
  ): T {
    return new WRoute({
      graph: node?.graph ?? this,
      type: node?.type ?? NodeType.Base,
      parent: node?.parent,
      child: node?.child,
      conditions: node?.conditions,
      attrs: {
        ...(node?.attrs ?? {}),
        id: node?.attrs?.id ?? this.getNextId(),
        name: node?.attrs?.name ?? 'New Node',
      },
    }) as T
  }

  createNode(
    node?: Partial<Omit<WBase, 'attrs'>> & DeepPartial<Pick<WBase, 'attrs'>>
  ): WBase {
    const createdNode = this.createNodeOnly(node)

    // TODO:
    // if (node?.parent) bindParentChild(node.parent, createdNode)
    // if (node?.child) bindParentChild(createdNode, node.child)

    return createdNode
  }

  createRoute(
    node?: Partial<Omit<WRoute, 'attrs'>> & DeepPartial<Pick<WRoute, 'attrs'>>
  ): WRoute {
    const createdRoute = this.createNodeOnly<WRoute>({
      ...node,
      type: NodeType.Route,
    })

    if (node?.parent) bindParentChild(node.parent, createdRoute)
    if (node?.child) bindParentChild(createdRoute, node.child)

    return createdRoute
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

    if (isRoute(parent) && isRouteCond(node)) {
      parent.conditions.splice(
        parent.conditions.findIndex((cond) => cond.attrs.id === node.attrs.id) +
          1,
        0,
        cond
      )
    } else {
      const createdRoute = this.createRoute()
      createdRoute.conditions = [node, cond]

      bindParentChild(createdRoute, node.child)
      bindParentChild(parent, createdRoute)

      createdRoute.conditions.forEach

      for (const cond of createdRoute.conditions) {
        cond.parent = createdRoute
      }
      node.child = null
    }
  }

  removeNode(node: WNode): void {
    // the root node cannot be removed.
    if (node.type === NodeType.Root) return

    const parent = node.parent
    if (!parent) return

    if (isRoute(parent) && isRouteCond(node)) {
      const index = findCondIndex(node)
      if (node.child) {
        parent.conditions.splice(index, 1, node.child)
        node.child.parent = parent
      } else {
        parent.conditions.splice(index, 1)
      }

      if (parent.conditions.length === 1) {
        const ancestor = parent.parent!
        parent.conditions = []
        const tail = getNodeTail(node)

        bindParentChild(ancestor, node)
        bindParentChild(tail, parent.child)
      }
    } else {
      bindParentChild(parent, node.child)
    }
  }

  swap(route: WRoute, pos1: number, pos2: number): void {
    if (!route.conditions[pos1] || !route.conditions[pos2]) return

    const temp = route.conditions[pos1]
    route.conditions[pos1] = route.conditions[pos2]
    route.conditions[pos2] = temp
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
