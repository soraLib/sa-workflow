import { NodeType } from './node'
import type { WNode } from './node'
import type { Graph } from './graph'

export const createMockRoot = (graph: Graph): WNode => {
  const root = graph.createNode({
    type: NodeType.Root,
    attrs: {
      name: 'root',
    },
  })
  root.addChild(
    graph.createNode({
      attrs: {
        name: 'Node A',
      },
    })
  )

  const CondB = graph.createCond({
    parent: root,
    attrs: {
      name: 'Cond B',
    },
  })
  root.conditions = [
    graph.createCond({
      parent: root,
      attrs: {
        name: 'Cond A',
      },
    }),
    CondB,
  ]

  CondB.addChild(
    graph.createNode({
      attrs: {
        name: 'Node C',
      },
    })
  )

  return root
}
