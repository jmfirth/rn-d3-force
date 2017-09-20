import React from 'react';
import { forceY, forceX, forceSimulation, forceCollide, forceManyBody, forceCenter } from 'd3-force';
import { randomUniform } from 'd3-random';
import { Svg } from 'expo';

export default class ForceDiagram extends React.Component {

  simulation = null;

  nodes = null;

  componentWillMount() {
    const { range, width, height } = this.props;

    this.simulation = forceSimulation()
      .force('collide', forceCollide(d => d.r + 8).iterations(16))
      .force('charge', forceManyBody())
      .force('center', forceCenter(width / 2, height / 2))
      .force('y', forceY(0))
      .force('x', forceX(0));

    this.nodes = new Array(range)
      .fill(null)
      .map((d, key) => ({
        r: randomUniform(10, 30)(),
        key,
      }));
  }

  componentDidMount() {
    this.simulation
      .nodes(this.nodes)
      .on('tick', () => this.forceUpdate());
  }

  render() {
    const { width, height } = this.props;

    return (
      <Svg width={width} height={height}>
        <Svg.G>
          {this.nodes && this.nodes.map(node => (
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