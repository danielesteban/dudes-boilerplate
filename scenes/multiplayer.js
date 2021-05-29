import HelloWorld from './helloworld.js';

class HelloWorldMultiplayer extends HelloWorld {
  constructor(scene) {
    super(scene, {
      server: 'ws://localhost:8081/',
    });
  }
}

export default HelloWorldMultiplayer;
