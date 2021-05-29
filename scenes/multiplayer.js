import HelloWorld from './helloworld.js';

class HelloWorldMultiplayer extends HelloWorld {
  constructor(scene) {
    super(scene, {
      server: 'ws://localhost:8081/',
    });
  }
}

HelloWorldMultiplayer.showInMenu = false;

export default HelloWorldMultiplayer;
