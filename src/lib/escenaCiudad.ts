import * as THREE from 'three';

/**
 * Ciudad verde de fondo para el hero. Pensada para ser ligera:
 * edificios y árboles instanciados, sin sombras, sprites en vez de materiales
 * transmisivos, pixel ratio ≤ 1.5, 30 fps en móvil y pausa fuera de pantalla.
 */
export function crearCiudad(canvas: HTMLCanvasElement, root: HTMLElement): () => void {
  const T = THREE;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const renderer = new T.WebGLRenderer({ canvas, antialias: dpr < 1.5, powerPreference: 'low-power' });
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const tex = (w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d')!, w, h);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  };
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);

  const scene = new T.Scene();
  const skyTex = tex(4, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, '#4FB3EC'); gr.addColorStop(0.45, '#A8DDF5'); gr.addColorStop(0.72, '#E6F6F5'); gr.addColorStop(1, '#F4FAF2');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  scene.background = skyTex;
  scene.fog = new T.Fog('#DCF1F3', 40, 150);

  // Reflejos: cielo de degradado prefiltrado una sola vez
  const envScene = new T.Scene();
  const skyGeo = new T.SphereGeometry(50, 24, 12);
  const sp = skyGeo.attributes.position;
  const cols: number[] = [];
  const c = new T.Color(), cTop = new T.Color('#3FA6E6'), cMid = new T.Color('#FFFFFF'), cBot = new T.Color('#5DB052');
  for (let i = 0; i < sp.count; i++) {
    const y = sp.getY(i) / 50;
    if (y > 0) c.copy(cMid).lerp(cTop, Math.min(1, y * 1.5)); else c.copy(cMid).lerp(cBot, Math.min(1, -y * 3));
    cols.push(c.r, c.g, c.b);
  }
  skyGeo.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
  envScene.add(new T.Mesh(skyGeo, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide })));
  const pm = new T.PMREMGenerator(renderer);
  const envTex = pm.fromScene(envScene, 0.04).texture;
  pm.dispose();
  skyGeo.dispose();

  scene.add(new T.HemisphereLight('#D6F1FF', '#6CBF5A', 1.1));
  const sun = new T.DirectionalLight('#FFF4DC', 1.5);
  sun.position.set(30, 40, 20);
  scene.add(sun);

  // Terreno
  const ground = (x: number, z: number) => {
    if (z > -19 && z < -13) return -0.45;
    let y = 1.1 * Math.sin(x * 0.07) * Math.cos(z * 0.09) + 0.6 * Math.sin(x * 0.18 + z * 0.11);
    if (z < -19 && Math.abs(x) < 30) y *= 0.15;
    if (z > -13) y += Math.min(2.6, (z + 13) * 0.05) * (0.6 + 0.4 * Math.sin(x * 0.12));
    return y;
  };
  const gGeo = new T.PlaneGeometry(320, 200, 72, 44);
  gGeo.rotateX(-Math.PI / 2);
  const gp = gGeo.attributes.position;
  const gcols: number[] = [];
  const g1 = new T.Color('#5DB54F'), g2 = new T.Color('#9ADB6C');
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i), z = gp.getZ(i) - 40;
    const y = ground(x, z);
    gp.setY(i, y); gp.setZ(i, z);
    c.copy(g1).lerp(g2, Math.max(0, Math.min(1, 0.45 + y * 0.25)));
    gcols.push(c.r, c.g, c.b);
  }
  gGeo.setAttribute('color', new T.Float32BufferAttribute(gcols, 3));
  gGeo.computeVertexNormals();
  scene.add(new T.Mesh(gGeo, new T.MeshLambertMaterial({ vertexColors: true })));

  const river = new T.Mesh(new T.PlaneGeometry(320, 5.2), new T.MeshStandardMaterial({ color: '#8FD6F2', metalness: 0.6, roughness: 0.12, envMap: envTex }));
  river.rotation.x = -Math.PI / 2;
  river.position.set(0, -0.05, -16);
  scene.add(river);

  // Torres de vidrio instanciadas
  const bands = tex(32, 64, (g, w, h) => {
    g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#C9E2EC';
    for (let y = 4; y < h; y += 6) g.fillRect(0, y, w, 1);
  });
  const glass = new T.MeshStandardMaterial({ map: bands, metalness: 0.45, roughness: 0.14, envMap: envTex, envMapIntensity: 1.1 });
  const palette = ['#FFFFFF', '#E3F3FA', '#C6E7F4', '#A9DAEE', '#D9F0E8', '#BFE6F5'].map((h) => new T.Color(h));
  const boxGeo = new T.BoxGeometry(1, 1, 1); boxGeo.translate(0, 0.5, 0);
  const cylGeo = new T.CylinderGeometry(0.5, 0.5, 1, 18); cylGeo.translate(0, 0.5, 0);
  const boxes = new T.InstancedMesh(boxGeo, glass, 58);
  const cyls = new T.InstancedMesh(cylGeo, glass, 8);
  const m4 = new T.Matrix4(), q = new T.Quaternion(), s3 = new T.Vector3(), p3 = new T.Vector3(), up = new T.Vector3(0, 1, 0);
  const place = (mesh: THREE.InstancedMesh, i: number, round: boolean) => {
    const x = (Math.random() - 0.5) * (Math.random() < 0.6 ? 26 : 52);
    const z = rnd(-58, -24);
    const core = Math.max(0, 1 - Math.abs(x) / 16);
    const h = 2 + Math.pow(Math.random(), 2) * 6 + core * rnd(1, 5);
    const w = round ? rnd(1.6, 2.6) : rnd(1.4, 3.2);
    p3.set(x, ground(x, z) - 0.2, z);
    q.setFromAxisAngle(up, round ? 0 : rnd(-0.25, 0.25));
    s3.set(w, h, round ? w : rnd(1.4, 3));
    mesh.setMatrixAt(i, m4.compose(p3, q, s3));
    mesh.setColorAt(i, palette[(Math.random() * palette.length) | 0]);
  };
  for (let i = 0; i < boxes.count; i++) place(boxes, i, false);
  for (let i = 0; i < cyls.count; i++) place(cyls, i, true);
  scene.add(boxes, cyls);

  // Árboles instanciados
  const trees = new T.InstancedMesh(new T.IcosahedronGeometry(1, 1), new T.MeshLambertMaterial({ color: '#FFFFFF' }), 70);
  const greens = ['#5DB85A', '#6CC463', '#4FAA55', '#7ACB6A'].map((h) => new T.Color(h));
  for (let i = 0; i < trees.count; i++) {
    let x: number, z: number;
    do { x = rnd(-60, 60); z = rnd(-12, 16); } while (Math.abs(x) < 9 && z > 4);
    const sc = rnd(0.5, 1.05);
    p3.set(x, ground(x, z) + sc * 0.7, z);
    s3.set(sc, sc * rnd(1.1, 1.5), sc);
    trees.setMatrixAt(i, m4.compose(p3, q.identity(), s3));
    trees.setColorAt(i, greens[i % greens.length]);
  }
  scene.add(trees);

  // Aerogeneradores
  const white = new T.MeshLambertMaterial({ color: '#FFFFFF' });
  const towerGeo = new T.CylinderGeometry(0.07, 0.14, 7, 8); towerGeo.translate(0, 3.5, 0);
  const bladeGeo = new T.BoxGeometry(0.16, 3.2, 0.05); bladeGeo.translate(0, 1.6, 0);
  const hubGeo = new T.SphereGeometry(0.2, 10, 8);
  const rotors: { rotor: THREE.Group; sp: number }[] = [];
  [[-8, -21], [10, -22], [-27, -7], [-37, -15], [22, -7], [32, -13]].forEach(([x, z], k) => {
    const tw = new T.Group();
    tw.position.set(x, ground(x, z), z);
    tw.add(new T.Mesh(towerGeo, white));
    const rotor = new T.Group();
    rotor.position.set(0, 7, 0.2);
    rotor.add(new T.Mesh(hubGeo, white));
    for (let b = 0; b < 3; b++) { const bl = new T.Mesh(bladeGeo, white); bl.rotation.z = (b * Math.PI * 2) / 3; rotor.add(bl); }
    rotor.rotation.z = k;
    tw.add(rotor);
    scene.add(tw);
    rotors.push({ rotor, sp: rnd(0.7, 1.2) });
  });

  // Sol, nubes y burbujas como sprites
  const glowTex = tex(128, 128, (g, w) => {
    const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    r.addColorStop(0, 'rgba(255,255,240,1)'); r.addColorStop(0.25, 'rgba(255,250,220,.75)'); r.addColorStop(1, 'rgba(255,250,220,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, w);
  });
  const sunSpr = new T.Sprite(new T.SpriteMaterial({ map: glowTex, blending: T.AdditiveBlending, depthWrite: false, fog: false }));
  sunSpr.position.set(46, 52, -120); sunSpr.scale.set(24, 24, 1);
  scene.add(sunSpr);

  const cloudTex = tex(256, 128, (g) => {
    [[70, 80, 42], [120, 62, 52], [178, 78, 40], [128, 90, 46]].forEach(([x, y, r]) => {
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(0.6, 'rgba(255,255,255,.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    });
  });
  const clouds: THREE.Sprite[] = [];
  for (let i = 0; i < 5; i++) {
    const s = new T.Sprite(new T.SpriteMaterial({ map: cloudTex, transparent: true, opacity: rnd(0.55, 0.85), depthWrite: false }));
    const k = rnd(16, 30);
    s.scale.set(k, k / 2, 1);
    s.position.set(rnd(-70, 70), rnd(20, 34), rnd(-120, -80));
    scene.add(s);
    clouds.push(s);
  }

  const bubTex = tex(128, 128, (g, w) => {
    const r = w / 2;
    const fill = g.createRadialGradient(r, r, r * 0.55, r, r, r);
    fill.addColorStop(0, 'rgba(200,240,255,0.04)'); fill.addColorStop(0.85, 'rgba(210,245,255,0.22)'); fill.addColorStop(1, 'rgba(255,255,255,0.75)');
    g.fillStyle = fill; g.beginPath(); g.arc(r, r, r - 1, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 3;
    g.beginPath(); g.arc(r, r, r * 0.72, Math.PI * 1.1, Math.PI * 1.45); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.95)'; g.beginPath(); g.ellipse(r * 0.62, r * 0.55, 6, 4, -0.6, 0, Math.PI * 2); g.fill();
  });
  const bubMat = new T.SpriteMaterial({ map: bubTex, transparent: true, depthWrite: false, fog: false });
  const bubbles: { s: THREE.Sprite; sp: number; ph: number; x: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const b = new T.Sprite(bubMat);
    const k = rnd(0.7, 2.2);
    b.scale.set(k, k, 1);
    b.position.set(rnd(-12, 12), rnd(2, 16), rnd(4, 18));
    scene.add(b);
    bubbles.push({ s: b, sp: rnd(0.3, 0.7), ph: rnd(0, 6.28), x: b.position.x });
  }

  // Cámara
  const cam = new T.PerspectiveCamera(40, 1, 0.5, 400);
  const base = { x: 0, y: 5, z: 34, lookY: 9.8 };
  let mobile = false;
  const size = () => {
    const w = root.clientWidth || 1, h = root.clientHeight || 1;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    const portrait = w / h < 0.8;
    cam.fov = portrait ? 46 : 38;
    base.lookY = 5 + 34 * Math.tan(portrait ? 0.26 : 0.13);
    cam.updateProjectionMatrix();
    mobile = w < 700;
  };
  size();
  const ro = new ResizeObserver(size);
  ro.observe(root);
  let vis = true;
  const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; });
  io.observe(root);
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const onMove = (e: PointerEvent) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener('pointermove', onMove, { passive: true });
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const clock = new T.Clock();
  let frame = 0, raf = 0, dead = false;

  const loop = () => {
    if (dead) return;
    raf = reduce ? 0 : requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05) * (mobile ? 2 : 1);
    if (mobile && (frame++ & 1)) return;
    if (!vis || document.hidden) return;
    const t = clock.elapsedTime;
    for (const r of rotors) r.rotor.rotation.z -= dt * r.sp;
    for (const cl of clouds) { cl.position.x += dt * 0.8; if (cl.position.x > 80) cl.position.x = -80; }
    for (const b of bubbles) {
      b.s.position.y += dt * b.sp;
      b.s.position.x = b.x + Math.sin(t * 0.6 + b.ph) * 0.6;
      if (b.s.position.y > 18) b.s.position.y = 1;
    }
    const sy = Math.min(window.scrollY || 0, 900);
    cx += (tx * 2.2 - cx) * 0.05;
    cy += (-ty * 0.8 - cy) * 0.05;
    cam.position.set(base.x + cx, base.y + cy + sy * 0.006, base.z - sy * 0.012);
    cam.lookAt(cx * 0.3, base.lookY + sy * 0.004, 0);
    renderer.render(scene, cam);
  };
  loop();

  return () => {
    dead = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    ro.disconnect();
    io.disconnect();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material & { map?: THREE.Texture | null } | undefined;
      if (mat) { mat.map?.dispose(); mat.dispose(); }
    });
    envTex.dispose();
    skyTex.dispose();
    renderer.dispose();
  };
}
