import React, {Component} from 'react';
import {Events,Engine,Render,World,Bodies,Mouse,MouseConstraint} from "matter-js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sceneRef = React.createRef();
  }

  componentDidMount() {

    const engine = Engine.create({
      // positionIterations: 20
    });

    const render = Render.create({
      element: this.sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: true,
        showVelocity: true,
        showAngleIndicator: true
      }
    });

    // walls.
    World.add(engine.world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // balls.
    World.add(engine.world, [
      Bodies.circle(210, 100, 30, { restitution: 0.5 }),
      Bodies.circle(110, 50, 30, { restitution: 0.5 })
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });

    World.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, "mousedown", function(event) {
      World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
    return <div ref={this.sceneRef} />;
  }
}

export default App;
