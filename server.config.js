module.exports = [
  {
    id: 'default',
    dudes: {
      maxDudes: 16,
    },
    world: {
      width: 400,
      height: 96,
      depth: 400,
      seaLevel: 6,
      generator: (x, y, z) => {
        const r = Math.sqrt((x - 200.5) ** 2 + ((y - 16.5) * 2) ** 2 + (z - 200.5) ** 2);
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
      },
    },
  },
];
