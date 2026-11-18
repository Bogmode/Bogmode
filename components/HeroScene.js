"use client";
import { useEffect, useRef } from "react";
import { useSkin } from "./SkinProvider";
import { SKIN_TOTEM, sampleTotem } from "./totems";

// Breathing point-cloud core with HUD rings. Colours follow the active skin.
// Pauses off-screen / in background tabs; renders one still frame for reduced motion.

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

function readColors(el) {
  const cs = getComputedStyle(el.closest(".bm") || document.body);
  const v = (n, f) => (cs.getPropertyValue(n).trim() || f);
  return { accent: v("--accent", "#FF5A1F"), ink: v("--ink", "#131317"), muted: v("--muted", "#6E6D66") };
}

function start(THREE, host, readout, api, label, skinRef) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  const rig = new THREE.Group();
  scene.add(rig);

  // Core: fibonacci-sphere point cloud, displaced by noise in the shader.
  const N = 2600, pos = new Float32Array(N * 3), rnd = new Float32Array(N);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = golden * i;
    pos.set([Math.cos(t) * r * 1.55, y * 1.55, Math.sin(t) * r * 1.55], i * 3);
    rnd[i] = Math.random();
  }
  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  coreGeo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
  const targetAttr = new THREE.BufferAttribute(sampleTotem(SKIN_TOTEM[skinRef.current] || "wolf", N), 3);
  coreGeo.setAttribute("aTarget", targetAttr);
  let totem = SKIN_TOTEM[skinRef.current] || "wolf";
  const uniforms = { uTime: { value: 0 }, uPulse: { value: 0 }, uMorph: { value: 0 }, uDpr: { value: dpr }, uColor: { value: new THREE.Color() } };
  const coreMat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `${NOISE}
      uniform float uTime; uniform float uPulse; uniform float uDpr; uniform float uMorph; attribute float aRand; attribute vec3 aTarget; varying float vA;
      void main(){
        vec3 p = position;
        float a = uTime * (0.12 + aRand * 0.4) + aRand * 6.2831;
        vec3 ax = normalize(vec3(sin(aRand * 17.0), cos(aRand * 29.0), sin(aRand * 7.0)));
        p = p * cos(a * 0.35) + cross(ax, p) * sin(a * 0.35) + ax * dot(ax, p) * (1.0 - cos(a * 0.35));
        float n = snoise(p * 0.9 + vec3(0.0, uTime * 0.16, uTime * 0.09));
        float breathe = sin(uTime * 1.1) * 0.05;
        p *= 1.0 + n * 0.2 + breathe + uPulse * 0.22 * (0.6 + aRand);
        float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.5 - aRand * 0.5, 0.0, 1.0));
        vec3 t = aTarget + vec3(sin(uTime * 2.0 + aRand * 40.0), cos(uTime * 1.7 + aRand * 30.0), 0.0) * 0.012
               + normalize(position) * uPulse * 0.5 * aRand;
        vec3 fp = mix(p, t, m);
        vec4 mv = modelViewMatrix * vec4(fp, 1.0);
        gl_Position = projectionMatrix * mv;
        float k = smoothstep(-0.3, 0.9, n);
        gl_PointSize = mix((1.1 + 2.4 * k + aRand * 0.6), (1.6 + aRand * 1.0), m) * uDpr * (8.5 / -mv.z);
        vA = mix(0.32 + 0.68 * k, 0.92 + 0.08 * aRand, m);
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(uColor, vA * smoothstep(0.5, 0.15, d));
      }`,
  });
  rig.add(new THREE.Points(coreGeo, coreMat));

  // Inner lattice.
  const latticeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.35 });
  const lattice = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.62, 1)), latticeMat);
  rig.add(lattice);

  // Orbit rings with satellites.
  const ringMat = new THREE.LineDashedMaterial({ dashSize: 0.06, gapSize: 0.08, transparent: true, opacity: 0.45 });
  const satMat = new THREE.MeshBasicMaterial();
  const orbits = [[2.15, 1.12, 0.35, 0.42], [2.45, -0.5, 1.1, -0.28]].map(([r, tx, tz, speed]) => {
    const g = new THREE.Group(); g.rotation.set(tx, 0, tz);
    const pts = new THREE.EllipseCurve(0, 0, r, r).getPoints(160).map((p) => new THREE.Vector3(p.x, 0, p.y));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
    line.computeLineDistances();
    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), satMat);
    g.add(line, sat); rig.add(g);
    return { g, sat, r, speed, phase: Math.random() * 6.28 };
  });

  // HUD tick ring, screen-facing.
  const tickPts = [];
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2, long = i % 8 === 0, r0 = 2.6, r1 = long ? 2.78 : 2.68;
    tickPts.push(new THREE.Vector3(Math.cos(a) * r0, Math.sin(a) * r0, 0), new THREE.Vector3(Math.cos(a) * r1, Math.sin(a) * r1, 0));
  }
  const tickMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 });
  const ticks = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tickPts), tickMat);
  scene.add(ticks);

  const setColor = () => {
    const c = readColors(host);
    uniforms.uColor.value.set(c.accent);
    satMat.color.set(c.accent);
    latticeMat.color.set("#f4f3ee");
    ringMat.color.set("#9b9a95");
    tickMat.color.set("#9b9a95");
    if (reduce) renderer.render(scene, camera);
  };
  const setTotem = (skin) => {
    const next = SKIN_TOTEM[skin] || "wolf";
    if (next === totem) return;
    totem = next; targetAttr.array.set(sampleTotem(totem, N)); targetAttr.needsUpdate = true;
    phaseStart = clock - 2.5; // new animal starts gathering about a second after the switch
    if (reduce) { uniforms.uMorph.value = 1; renderer.render(scene, camera); }
  };
  api.current = { setColor, setTotem };
  setColor();

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (reduce) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(resize); ro.observe(host); resize();

  // Pointer steering + click pulse.
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  const onMove = (e) => {
    const b = host.getBoundingClientRect();
    target.x = ((e.clientX - b.left) / b.width - 0.5) * 2;
    target.y = ((e.clientY - b.top) / b.height - 0.5) * 2;
  };
  const onLeave = () => { target.x = 0; target.y = 0; };
  const onDown = () => { uniforms.uPulse.value = 1; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);

  // Cycle: swarm → gather into totem → hold → scatter.
  const CYCLE = 12, ease = (x) => x * x * (3 - 2 * x);
  let clock = 0, phaseStart = -2.5, faceTo = 0, faceLocked = false;
  const morphAt = (c) => {
    const u = ((c - phaseStart) % CYCLE + CYCLE) % CYCLE;
    if (u < 3.5) return 0;
    if (u < 5.3) return ease((u - 3.5) / 1.8);
    if (u < 9.8) return 1;
    if (u < 11.4) return 1 - ease((u - 9.8) / 1.6);
    return 0;
  };
  let raf = 0, running = false, last = performance.now(), t = 0, frame = 0;
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05); last = now; t += dt; frame++;
    uniforms.uTime.value = t;
    uniforms.uPulse.value *= Math.pow(0.12, dt);
    cur.x += (target.x - cur.x) * (1 - Math.exp(-dt * 2.2));
    cur.y += (target.y - cur.y) * (1 - Math.exp(-dt * 2.2));
    clock = t;
    const me = morphAt(t);
    uniforms.uMorph.value = me;
    const spin = t * 0.12;
    if (me > 0 && !faceLocked) { faceLocked = true; faceTo = Math.round(spin / (Math.PI * 2)) * Math.PI * 2; }
    if (me === 0) faceLocked = false;
    const face = faceLocked ? faceTo : spin;
    rig.rotation.y = spin + (face - spin) * me + cur.x * (0.55 - 0.4 * me);
    rig.rotation.x = (0.18 + cur.y * 0.35) * (1 - me * 0.85);
    latticeMat.opacity = 0.5 * (1 - me);
    ringMat.opacity = 0.55 * (1 - 0.65 * me);
    if (label.current) {
      const name = me > 0.6 ? `БОГMODE / ${totem.toUpperCase()}` : "БОГMODE / CORE";
      if (label.current.textContent !== name) label.current.textContent = name;
    }
    lattice.rotation.set(-t * 0.3, t * 0.22, 0);
    ticks.rotation.z = -t * 0.04;
    for (const o of orbits) {
      const a = o.phase + t * o.speed;
      o.sat.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
    }
    renderer.render(scene, camera);
    if (readout.current && frame % 20 === 0) {
      const deg = ((rig.rotation.y * 180 / Math.PI) % 360 + 360) % 360;
      readout.current.textContent = `ROT ${deg.toFixed(0).padStart(3, "0")}° · SIG ${(0.6 + 0.4 * Math.sin(t * 1.1)).toFixed(2)}`;
    }
    raf = requestAnimationFrame(tick);
  };
  const play = () => { if (running || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(tick); };
  const pause = () => { running = false; cancelAnimationFrame(raf); };
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible && !document.hidden ? play() : pause(); });
  io.observe(host);
  const onVis = () => (visible && !document.hidden ? play() : pause());
  document.addEventListener("visibilitychange", onVis);
  if (reduce) { if (readout.current) readout.current.textContent = "STATIC"; uniforms.uMorph.value = 1; lattice.visible = false; if (label.current) label.current.textContent = `БОГMODE / ${totem.toUpperCase()}`; renderer.render(scene, camera); } else play();

  return () => {
    pause(); io.disconnect(); ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("pointerdown", onDown);
    scene.traverse((o) => { o.geometry?.dispose(); });
    [coreMat, latticeMat, ringMat, satMat, tickMat].forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    api.current = null;
  };
}

export default function HeroScene() {
  const host = useRef(null);
  const readout = useRef(null);
  const api = useRef(null);
  const label = useRef(null);
  const { skin } = useSkin();
  const skinRef = useRef(skin);
  skinRef.current = skin;

  useEffect(() => {
    let cleanup = () => {}, cancelled = false;
    import("three").then((THREE) => {
      if (cancelled || !host.current) return;
      try { cleanup = start(THREE, host.current, readout, api, label, skinRef); }
      catch { host.current?.classList.add("no-webgl"); }
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => { api.current?.setColor(); api.current?.setTotem(skin); });
    return () => cancelAnimationFrame(id);
  }, [skin]);

  return (
    <figure className="hero-model hero-scene" data-parallax="-0.06">
      <div className="hero-model-head"><span ref={label}>БОГMODE / CORE</span><span ref={readout}>INIT</span></div>
      <div className="hero-model-stage hero-scene-stage" ref={host} aria-hidden="true" />
      <figcaption>WATCH IT GATHER · CLICK TO SCATTER <span>LIVE / THREE.JS</span></figcaption>
    </figure>
  );
}
