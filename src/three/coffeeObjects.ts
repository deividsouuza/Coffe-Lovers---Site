import { CanvasTexture, CylinderGeometry, Group, LatheGeometry, Mesh, MeshStandardMaterial, Sprite, SpriteMaterial, TorusGeometry, Vector2 } from 'three';
import { createCoffeeSurface } from './coffeeSurface';

export function createCoffeeObjects() {
  const resources = new Set<{ dispose: () => void }>();
  const keep = <T extends { dispose: () => void }>(resource: T): T => { resources.add(resource); return resource; };
  const group = new Group();
  const ceramicCanvas = document.createElement('canvas');
  ceramicCanvas.width = ceramicCanvas.height = 256;
  const paint = ceramicCanvas.getContext('2d')!;
  paint.fillStyle = '#f6eee5'; paint.fillRect(0, 0, 256, 256);
  let seed = 72;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 1000; i++) {
    paint.fillStyle = `rgba(90,46,31,${.025 + random()*.07})`;
    paint.fillRect(random()*256, random()*256, .5+random(), .5+random());
  }
  const ceramicMap = keep(new CanvasTexture(ceramicCanvas));
  const ceramic = keep(new MeshStandardMaterial({ color: '#e6d3bf', map: ceramicMap, roughness: .27, metalness: .035 }));
  const lathe = (points: number[][]) => keep(new LatheGeometry(points.map(([r,y]) => new Vector2(r,y)), 64));
  const cup = new Mesh(lathe([[0,.16],[.54,.16],[.62,.20],[.69,.32],[.8,.6],[.94,1.1],[1,1.4],[1.005,1.44],[.99,1.465],[.955,1.46],[.935,1.42],[.89,1.08],[.75,.58],[.58,.28],[0,.25]]), ceramic);
  group.add(cup);
  const saucer = new Mesh(lathe([[0,.025],[.85,.025],[1.42,.07],[1.67,.15],[1.72,.19],[1.70,.23],[1.55,.24],[1.35,.15],[.85,.16],[0,.16]]), ceramic);
  group.add(saucer);
  const handle = new Mesh(keep(new TorusGeometry(.47,.105,12,48)), ceramic);
  handle.position.set(1.09,.88,0); handle.scale.y = 1.18;
  group.add(handle);
  const rim = new Mesh(keep(new TorusGeometry(.98,.025,8,64)), ceramic);
  rim.rotation.x = Math.PI / 2; rim.position.y = 1.455;
  group.add(rim);

  const surface = createCoffeeSurface();
  keep(surface); group.add(surface.mesh);
  const streamMaterial = keep(new MeshStandardMaterial({ color: '#714021', roughness: .22, metalness: .05, transparent: true, opacity: .88 }));
  const stream = new Mesh(keep(new CylinderGeometry(.027,.037,5,8)), streamMaterial);
  stream.position.set(-.22,3.845,.08); group.add(stream);

  const vaporCanvas = document.createElement('canvas');
  vaporCanvas.width = vaporCanvas.height = 128;
  const vaporPaint = vaporCanvas.getContext('2d')!;
  const haze = vaporPaint.createRadialGradient(64,64,0,64,64,64);
  haze.addColorStop(0,'rgba(255,247,232,.55)'); haze.addColorStop(.45,'rgba(255,247,232,.12)'); haze.addColorStop(1,'rgba(255,247,232,0)');
  vaporPaint.fillStyle = haze; vaporPaint.fillRect(0,0,128,128);
  const vaporMap = keep(new CanvasTexture(vaporCanvas));
  const steam = Array.from({ length: 7 }, () => {
    const sprite = new Sprite(keep(new SpriteMaterial({ map: vaporMap, color: '#f6eee5', transparent: true, opacity: .1, depthWrite: false })));
    group.add(sprite); return sprite;
  });

  function update(time: number) {
    surface.material.uniforms.time.value = time;
    const cycle = time % 9;
    const pour = cycle < 6.5 ? Math.min(1, cycle/.7+.2) : Math.max(0,1-(cycle-6.5)/1.3);
    stream.scale.x = stream.scale.z = .7 + Math.sin(time*11)*.045;
    streamMaterial.opacity = pour*.88;
    steam.forEach((sprite, index) => {
      const progress = (time*.13 + index/steam.length) % 1;
      sprite.position.set(Math.sin(time*.3+index)*.16,1.48+progress*1.3,Math.cos(index)*.12);
      const size = .28+progress*.7; sprite.scale.set(size*.65,size,1);
      sprite.material.opacity = Math.sin(progress*Math.PI)*.13;
      sprite.material.rotation = Math.sin(time*.2+index)*.3;
    });
  }
  update(2);
  return { group, update, dispose: () => { resources.forEach(resource => resource.dispose()); resources.clear(); } };
}
