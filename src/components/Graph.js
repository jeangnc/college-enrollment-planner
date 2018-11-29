import React, { Component } from 'react';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvas.current;

    if (canvas.getContext) {
      var context = canvas.getContext('2d');
      context.beginPath();
      context.moveTo(10,10);
      context.lineTo(50,50);
      context.lineTo(100,100);
      context.lineTo(200,200);
      context.stroke();
    }
  }

  render() {
    return (
      <canvas style={{ width: 500, height: 500, background: '#eaeaea', zIndex: 0 }} ref={this.canvas}/>
    );
  }
}

export default Graph;
