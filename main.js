import { Renderer, Router } from 'dudes';
import * as scenes from './scenes/index.js';

const router = new Router();
const renderer = new Renderer({
  dom: {
    cursor: document.getElementById('cursor'),
    enterVR: document.getElementById('enterVR'),
    fps: document.getElementById('fps'),
    renderer: document.getElementById('renderer'),
  },
  router,
  scenes,
});

router.addEventListener('update', ({ route, params }) => {
  if (route === '') {
    route = 'helloworld';
  }
  if (!scenes[route]) {
    router.replace('/');
    return;
  }
  renderer.scene.load(route, params);
});
router.update();
