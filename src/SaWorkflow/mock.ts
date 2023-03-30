import { NodeType } from './node'
import type { Graph } from './graph'

export const createMockRoot = (graph: Graph) => {
  const root = graph.createNode({
    type: NodeType.Root,
    attrs: {
      name: 'root',
    },
  })

  const CondA = graph.createNode({
    type: NodeType.Condition,
    parent: root,
    attrs: {
      name: 'Cond A',
    },
  })
  const CondAChild = graph.createNode({
    parent: CondA,
    attrs: {
      name: 'Cond A Child A',
    },
  })

  CondAChild.conditions.push(
    graph.createNode({
      type: NodeType.Condition,
      parent: CondAChild,
      attrs: {
        name: 'Cond A Child A Cond A',
      },
    }),
    graph.createNode({
      type: NodeType.Condition,
      parent: CondAChild,
      attrs: {
        name: 'Cond A Child A Cond B',
      },
    })
  )

  root.conditions.push(
    CondA,
    graph.createNode({
      type: NodeType.Condition,
      parent: root,
      attrs: {
        name: 'Cond B',
      },
    })
  )

  root.child = graph.createNode({
    parent: root,
    attrs: {
      name: 'Node A',
    },
  })

  console.log('root', root)

  return root
}
