import { Gameplay } from 'dudes';
import { Color } from 'three';

class HelloWorld extends Gameplay {
  constructor(scene) {
    super(scene, {
      lightToggle: true,
      rainToggle: true,
      dudes: {
        spawn: { count: 16 },
      },
      world: {
        width: 256,
        height: 32,
        depth: 256,
        seaLevel: 6,
        generator: (x, y, z) => {
          const r = Math.sqrt((x - 128.5) ** 2 + ((y - 16.5) * 2) ** 2 + (z - 128.5) ** 2);
          if (
            r > 32 && r < 64 && y < 16
          ) {
            return {
              type: 'stone',
              r: 0xBB - Math.random() * 0x33,
              g: 0x66 - Math.random() * 0x33,
              b: 0x44 - Math.random() * 0x22,
            };
          }
          return false;
        }
      },
    });

    this.brush = {
      color: new Color(0xFFFFFF * Math.random()),
      noise: 0.15,
      type: 'stone',
      shape: 'sphere',
      size: 3,
    };
  }

  onAnimationTick({ animation, camera, isXR }) {
    const {
      brush,
      hasLoaded,
      physics,
      player,
      world,
    } = this;
    super.onAnimationTick({ animation, camera, isXR });
    if (!hasLoaded) {
      return;
    }
    (isXR ? player.controllers : [player.desktop]).forEach(({
      buttons,
      hand,
      pointer,
      raycaster,
    }) => {
      if (isXR && hand) {
        const hit = physics.raycast(raycaster.ray.origin, raycaster.ray.direction);
        if (hit) {
          pointer.update({
            distance: hit.distance,
            origin: raycaster.ray.origin,
            target: hit,
          });
        }
      }
      const isPlacing = isXR ? (
        pointer.visible && buttons.triggerDown
      ) : (
        buttons.primaryDown
      );
      const isRemoving = isXR ? (
        pointer.visible && buttons.gripDown
      ) : (
        buttons.secondaryDown
      );
      if (isPlacing || isRemoving) {
        const hit = isXR ? pointer.target : (
          physics.raycast(raycaster.ray.origin, raycaster.ray.direction)
        );
        if (!hit) {
          return;
        }
        this.updateVoxel(
          {
            ...brush,
            type: isRemoving ? 0 : brush.type,
          },
          hit.point
            .divideScalar(world.scale)
            .addScaledVector(hit.normal, isRemoving ? -0.25 : 0.25)
            .floor()
        );
      }
    });
  }
}

export default HelloWorld;