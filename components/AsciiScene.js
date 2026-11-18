"use client";
import { useEffect, useRef } from "react";

// Tiny three.js scenes rendered as ASCII: atom, microbe, planet.
// Always alive while on screen; paused off-screen; one still frame for reduced motion.

function build(THREE, kind) {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8); rim.position.set(-4, -2, -3); scene.add(rim);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.05 });
  const root = new THREE.Group(); scene.add(root);
  const parts = {};

  if (kind === "atom") {
    const nucleus = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), mat);
      s.position.set((Math.random() - .5) * .5, (Math.random() - .5) * .5, (Math.random() - .5) * .5);
      nucleus.add(s);
    }
    root.add(nucleus);
    parts.orbits = [0, 1, 2].map((i) => {
      const g = new THREE.Group(); g.rotation.set(i * 1.05, i * 0.6, 0);
      g.add(new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.03, 8, 96), mat));
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), mat); g.add(e);
      root.add(g); return { g, e, speed: 1.4 + i * 0.5, phase: i * 2 };
    });
    parts.nucleus = nucleus;
  }

  if (kind === "microbe") {
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 1.5, 12, 24), mat);
    body.rotation.z = Math.PI / 2;
    root.add(body);
    parts.base = body.geometry.attributes.position.array.slice();
    parts.body = body;
    parts.cilia = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, x = (i % 7) / 3 - 1;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.012, 0.5, 6), mat);
      const holder = new THREE.Group();
      holder.position.set(x * 0.9, Math.cos(a) * 0.62, Math.sin(a) * 0.62);
      holder.rotation.x = a; c.position.y = 0.25; holder.add(c); root.add(holder);
      parts.cilia.push({ holder, a, x });
    }
    const tail = new THREE.Mesh(new THREE.TorusKnotGeometry(0.22, 0.03, 64, 6, 2, 5), mat);
    tail.position.x = -1.75; tail.rotation.y = Math.PI / 2; root.add(tail); parts.tail = tail;
  }

  if (kind === "planet") {
    const planet = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 4), mat);
    root.add(planet); parts.planet = planet;
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.7, 2.45, 120), new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, roughness: .7 }));
    ring.rotation.x = Math.PI / 2 - 0.42; root.add(ring);
    const moonPivot = new THREE.Group(); root.add(moonPivot);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mat); moon.position.x = 2.9; moonPivot.add(moon);
    parts.moonPivot = moonPivot;
    root.rotation.z = 0.18;
  }

  const update = (t) => {
    if (kind === "atom") {
      parts.nucleus.rotation.set(t * 0.4, t * 0.6, 0);
      const s = 1 + Math.sin(t * 2.2) * 0.04; parts.nucleus.scale.setScalar(s);
      for (const o of parts.orbits) { const a = o.phase + t * o.speed; o.e.position.set(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0); }
      root.rotation.y = Math.sin(t * 0.3) * 0.5;
    }
    if (kind === "microbe") {
      const pos = parts.body.geometry.attributes.position, b = parts.base;
      for (let i = 0; i < pos.count; i++) {
        const x = b[i * 3], y = b[i * 3 + 1], z = b[i * 3 + 2];
        const w = 1 + Math.sin(y * 2.4 + t * 3) * 0.06 + Math.sin(x * 3 + t * 2) * 0.04;
        pos.setXYZ(i, x * w, y, z * w);
      }
      pos.needsUpdate = true; parts.body.geometry.computeVertexNormals();
      parts.cilia.forEach((c, i) => { c.holder.rotation.z = Math.sin(t * 6 + i * 0.8) * 0.45; });
      parts.tail.rotation.x = t * 8;
      root.position.y = Math.sin(t * 1.3) * 0.12;
      root.rotation.set(Math.sin(t * 0.7) * 0.25, t * 0.35, Math.sin(t * 0.9) * 0.12);
    }
    if (kind === "planet") {
      parts.planet.rotation.y = t * 0.5;
      parts.moonPivot.rotation.y = t * 0.9;
      root.rotation.y = Math.sin(t * 0.25) * 0.15;
    }
  };
  return { scene, update };
}

export default function AsciiScene({ kind = "atom", label }) {
  const host = useRef(null);

  useEffect(() => {
    let cleanup = () => {}, cancelled = false;
    Promise.all([import("three"), import("three/examples/jsm/effects/AsciiEffect.js")]).then(([THREE, { AsciiEffect }]) => {
      const el = host.current;
      if (cancelled || !el) return;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true }); }
      catch { el.classList.add("no-webgl"); return; }
      renderer.setClearColor(0x000000, 0);
      const effect = new AsciiEffect(renderer, " .,:;-=+*x#%@", { resolution: 0.2, invert: false });
      effect.domElement.className = "ascii-out";
      el.appendChild(effect.domElement);
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50); camera.position.set(0, 0, kind === "planet" ? 10 : 7.2);
      const { scene, update } = build(THREE, kind);
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const frameTime = matchMedia("(max-width: 820px)").matches ? 1 / 15 : 1 / 30;

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
        effect.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
        update(1.2); effect.render(scene, camera);
      };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();

      let raf = 0, running = false, t = Math.random() * 10, last = 0, acc = 0;
      const loop = (now) => {
        const dt = Math.min((now - (last || now)) / 1000, 0.05); last = now; t += dt; acc += dt;
        if (acc > frameTime) { acc = 0; update(t); effect.render(scene, camera); }
        raf = requestAnimationFrame(loop);
      };
      const play = () => { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); };
      const pause = () => { running = false; cancelAnimationFrame(raf); };
      const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? play() : pause()));
      io.observe(el);

      cleanup = () => {
        pause(); io.disconnect(); ro.disconnect();
        scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
        renderer.dispose(); effect.domElement.remove();
      };
    });
    return () => { cancelled = true; cleanup(); };
  }, [kind]);

  return <div className="ascii-stage" ref={host} role="img" aria-label={label || `${kind} animation`} />;
}
