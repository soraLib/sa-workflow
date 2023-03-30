import { NodeType, WCondNode, WNode } from './node'

const root = new WNode({
  type: NodeType.Root,
  attrs: {
    id: '1',
    name: 'root',
  },
})

const CondA = new WCondNode({
  type: NodeType.Condition,
  parent: root,
  attrs: {
    id: '3',
    name: 'Cond A',
  },
})
const CondAChild = new WCondNode({
  type: NodeType.Node,
  parent: root,
  attrs: {
    id: '4',
    name: 'Cond A Child A',
  },
})
CondA.child = CondAChild
CondAChild.conditions.push(
  new WCondNode({
    type: NodeType.Condition,
    parent: CondAChild,
    attrs: {
      id: '5',
      name: 'Cond A Child A Cond A',
    },
  }),
  new WCondNode({
    type: NodeType.Condition,
    parent: CondAChild,
    attrs: {
      id: '6',
      name: 'Cond A Child A Cond B',
    },
  })
)

root.conditions.push(
  CondA,
  new WCondNode({
    type: NodeType.Condition,
    parent: root,
    attrs: {
      id: '7',
      name: 'Cond B',
    },
  })
)

root.child = new WNode({
  type: NodeType.Node,
  parent: root,
  attrs: {
    id: '2',
    name: 'Node A',
  },
})

export const mockRoot = root
