import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { forceY, forceX, forceSimulation, forceCollide, forceLink, forceManyBody, forceCenter } from 'd3-force';
import { randomUniform } from 'd3-random';
import { Svg } from 'expo';

export default class ForceDiagram extends React.Component {
  state = { nodes: null };

  simulation = null;

  data = null;

  componentWillMount() {
    const { range, width, height } = this.props;

    this.simulation = forceSimulation()
      .force('link', forceLink().id(d => d.id))
      .force('collide', forceCollide(d => d.r + 8).iterations(16))
      .force('charge', forceManyBody())
      .force('center', forceCenter(width / 2, height / 2))
      .force('y', forceY(0))
      .force('x', forceX(0));

    this.setState({
      nodes: new Array(range)
        .fill(null)
        .map((d, key) => ({
          label: `l${d}`,
          r: randomUniform(10, 30)(),
          key,
        })),
    });
  }

  componentDidMount() {
    const { nodes } = this.state;

    setTimeout(
      () => this.simulation.nodes(nodes).on('tick', () => this.forceUpdate()),
      0,
    );
  }

  render() {
    const { width, height } = this.props;
    const { nodes } = this.state;

    return (
      <Svg width={width} height={height}>
        <Svg.G>
          {nodes.map(node => (
            <Svg.Circle
              r={node.r}
              fill={'#000'}
              cx={node.x}
              cy={node.y}
              key={node.key}
            />
          ))}
        </Svg.G>
      </Svg>
    );
  }
}