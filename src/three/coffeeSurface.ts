import { CircleGeometry, Mesh, ShaderMaterial } from 'three';

/** Crema procedural: sem vídeo, textura remota ou simulação física por frame. */
export function createCoffeeSurface() {
  const material = new ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      varying vec2 coffeeUv;
      void main() {
        coffeeUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform float time;
      varying vec2 coffeeUv;
      float grain(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(grain(i), grain(i+vec2(1.,0.)),u.x), mix(grain(i+vec2(0.,1.)),grain(i+1.),u.x),u.y);
      }
      void main() {
        vec2 p = coffeeUv * 2.0 - 1.0;
        float radius = length(p);
        float angle = atan(p.y, p.x) + time * .055;
        vec2 swirl = vec2(cos(angle + radius*1.4), sin(angle + radius*1.4))*radius;
        float texture = noise(swirl*8.0 + vec2(time*.025,0.))*.65 + noise(swirl*24.0)*.35;
        float foam = .38 + smoothstep(.25,.85,texture)*.32 + smoothstep(.72,1.0,radius)*.15;
        vec3 coffee = mix(vec3(.065,.019,.007),vec3(.58,.28,.085),foam);
        float ripple = sin(length(p-vec2(-.22,.08))*43.0-time*3.0);
        coffee += vec3(.075,.035,.012)*ripple*.18;
        float reflection = exp(-length((p-vec2(-.32,.28))*vec2(2.2,5.0))*2.8);
        coffee += vec3(.26,.16,.065)*reflection;
        gl_FragColor = vec4(coffee,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const geometry = new CircleGeometry(.927, 64);
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 1.345;
  return { mesh, material, dispose: () => { geometry.dispose(); material.dispose(); } };
}
