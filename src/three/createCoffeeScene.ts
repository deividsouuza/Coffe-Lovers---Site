import { ACESFilmicToneMapping, CanvasTexture, Color, DirectionalLight, Fog, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SRGBColorSpace, WebGLRenderer } from 'three';
import { createCoffeeObjects } from './coffeeObjects';

export interface CoffeeScene {
  setRunning: (running: boolean) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

export function createCoffeeScene(canvas: HTMLCanvasElement, context: WebGL2RenderingContext, onError: () => void): CoffeeScene {
  const renderer = new WebGLRenderer({ canvas, context, antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.debug.onShaderError = () => { throw new Error('Não foi possível preparar a cena 3D.'); };
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new Scene();
  scene.background = new Color('#2b130d'); scene.fog = new Fog('#2b130d',7,16);
  const camera = new PerspectiveCamera(38,1,.1,30);
  const coffee = createCoffeeObjects(); scene.add(coffee.group);
  const sky = new HemisphereLight('#fff1d8','#5a2e1f',1.7); scene.add(sky);
  const key = new DirectionalLight('#ffe2b4',3.2); key.position.set(-3,5,4); scene.add(key);
  const fill = new DirectionalLight('#dae1cf',.9); fill.position.set(3,3,-3); scene.add(fill);
  const floorGeometry = new PlaneGeometry(60,60);
  const floorMaterial = new MeshStandardMaterial({ color: '#40251a', roughness: 1 });
  const floor = new Mesh(floorGeometry,floorMaterial); floor.rotation.x = -Math.PI/2; floor.position.y = -.01; scene.add(floor);
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const paint = shadowCanvas.getContext('2d')!;
  const shadow = paint.createRadialGradient(64,64,8,64,64,64);
  shadow.addColorStop(0,'rgba(0,0,0,.65)'); shadow.addColorStop(1,'rgba(0,0,0,0)');
  paint.fillStyle = shadow; paint.fillRect(0,0,128,128);
  const shadowMap = new CanvasTexture(shadowCanvas);
  const shadowGeometry = new PlaneGeometry(4.7,4.7);
  const shadowMaterial = new MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false });
  const contact = new Mesh(shadowGeometry,shadowMaterial); contact.rotation.x = -Math.PI/2; contact.position.y = .001; scene.add(contact);

  let disposed = false, running = false, frame = 0, last = 0, time = 2, aspect = 1, pointerX = 0, pointerY = 0, x = 0, y = 0;
  const coarsePointer = matchMedia('(pointer: coarse)');
  const mobile = () => coarsePointer.matches || innerWidth < 768;
  const draw = () => {
    const fit = Math.max(1,1.15/aspect);
    x += (pointerX-x)*.055; y += (pointerY-y)*.055;
    camera.position.set((2.8+x*.3)*fit,(2.7+y*.14)*fit,4.1*fit);
    camera.lookAt(0,.85,0);
    coffee.update(time); renderer.render(scene,camera);
  };
  const tick = (now: number) => {
    frame = 0;
    if (!running || disposed) return;
    if (now-last >= 1000/(mobile()?30:45)) {
      time += Math.min((now-last)/1000,.1); last = now;
      try { draw(); } catch { running = false; onError(); return; }
    }
    frame = requestAnimationFrame(tick);
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || !running) return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = (event.clientX-bounds.left)/bounds.width-.5;
    pointerY = (event.clientY-bounds.top)/bounds.height-.5;
  };
  const pointerLeave = () => { pointerX = pointerY = 0; };
  canvas.addEventListener('pointermove',pointerMove,{ passive: true });
  canvas.addEventListener('pointerleave',pointerLeave);

  return {
    setRunning(value) {
      if (disposed) return;
      canvas.dataset.running = String(value);
      if (value === running) return;
      running = value;
      if (value) { last = performance.now(); frame = requestAnimationFrame(tick); }
      else { cancelAnimationFrame(frame); frame = 0; }
    },
    resize(width,height) {
      if (disposed || !width || !height) return;
      aspect = width/height; camera.aspect = aspect; camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1,mobile()?1.5:2));
      renderer.setSize(width,height,false); draw();
    },
    dispose() {
      if (disposed) return;
      disposed = true; running = false; cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove',pointerMove); canvas.removeEventListener('pointerleave',pointerLeave);
      coffee.dispose(); floorGeometry.dispose(); floorMaterial.dispose(); shadowMap.dispose(); shadowGeometry.dispose(); shadowMaterial.dispose();
      renderer.dispose(); if (!context.isContextLost()) renderer.forceContextLoss();
      delete canvas.dataset.running;
    },
  };
}
