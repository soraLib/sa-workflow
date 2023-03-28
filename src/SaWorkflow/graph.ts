import { cloneDeep } from 'lodash-es'
import { findNode, findTreeNode, setObjectValues } from '@sa/utils'
import { NodeType } from './node'
import type { InjectionKey } from 'vue'
import type { BasicNode, BasicNodeAttributes, WNode } from './node'
import type { BasicRecord, BasicRecordStore } from './record'

export const GRAPH_INJECTION_KEY: InjectionKey<Graph> = Symbol('graph')

export namespace Graph {
  export type Direction = 'horizontal' | 'vertical'
  export interface Base {
    /** graph root node, contain all nodes here */
    root: BasicNode
    /** record histories */
    // history: BasicRecordStore
    /** current selected nodes */
    selected: BasicNode[]
    /** graph display direction, default is vertical */
    direction: Direction
    getNextId(): string
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
  nextId: string
  // TODO: history

  constructor(options: { root: WNode; direction?: Graph.Direction }) {
    this.direction = options?.direction ?? 'vertical'
    this.nextId = '1'
    this.root = options.root
    this.selected = [this.root]
  }
  getNextId() {
    return (this.nextId = String(Number(this.nextId) + 1))
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
