import React, {Component} from 'react';
import {
  Bodies,
  Common,
  Composites,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World
} from "matter-js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sceneRef = React.createRef();
  }

  componentDidMount() {

    const engine = Engine.create();
    const render = Render.create({
      element: this.sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 420,
        wireframes: false,
        // showVelocity: true,
        // showAngleIndicator: true
      }
    });
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // walls.
    World.add(engine.world, [
      Bodies.rectangle(420, 0, 1200, 50, {isStatic: true}),
      Bodies.rectangle(400, 600, 1200, 50.5, {isStatic: true}),
      Bodies.rectangle(960, 300, 50, 600, {isStatic: true}),
      Bodies.rectangle(-160, 300, 50, 600, {isStatic: true})
    ]);

    engine.world.gravity.y = 1; // -1 makes it anti gravity

    const stack = Composites.stack(200, 350, 1, 7, 0, 0, function (x, y) {
      if (Common.random() < 0.8) {
        return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
      } else {
        return Bodies.rectangle(x + 6, y, Common.random(80, 120), Common.random(20, 30));
      }
    });
    World.add(engine.world, stack);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    World.add(engine.world, mouseConstraint);

    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: {x: 0, y: 0},
      max: {x: 800, y: 600}
    });

  }

  render() {
    return <div ref={this.sceneRef} />;
  }
}

export default App;
