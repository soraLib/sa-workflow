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

  const routeA = graph.createRoute({
    type: NodeType.Route,
    attrs: {
      name: 'Route A',
    },
  })

  const routeAChildA = graph.createNode({
    parent: routeA,
    attrs: { name: 'Route A Child A' },
  })

  const deepRoute = graph.createRoute({
    type: NodeType.Route,
    parent: routeAChildA,
    attrs: {
      name: 'Deep Route',
    },
  })
  deepRoute.conditions = [
    graph.createNode({
      parent: deepRoute,
      attrs: { name: 'RA Child A' },
    }),
    graph.createNode({
      parent: deepRoute,
      attrs: { name: 'RA Child B' },
    }),
  ]

  routeA.conditions = [
    routeAChildA,
    graph.createNode({
      parent: routeA,
      attrs: { name: 'Route A Child B' },
    }),
  ]

  root.addChild(routeA)

  return root
}
