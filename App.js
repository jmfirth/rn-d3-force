import React from 'react';
import { StyleSheet, View } from 'react-native';
import ForceDiagram from './ForceDiagram';

export default class App extends React.Component {
  state = {
    width: 0,
    height: 0,
  };

  onLayout = ({ nativeEvent: { layout }}) => this.setState({
    width: layout.width,
    height: layout.height,
  });

  render() {
    const { width, height } = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {!!width && !!height && (
          <ForceDiagram width={width} height={height} range={10} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

