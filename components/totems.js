// Totem silhouettes (0–100 box, y down), one per skin. Original low-poly shapes.
export const SKIN_TOTEM = { asiimov: "wolf", vulcan: "hare", manticore: "manticore", donatello: "dragon", mono: "bear" };

export const TOTEMS = {"wolf": [[50, 4], [56, 11], [66, 11], [84, 7], [83, 14], [67, 25], [61, 36], [63, 52], [66, 72], [68, 97], [57, 97], [55, 80], [50, 88], [46, 97], [20, 97], [3, 96], [6, 90], [20, 82], [24, 70], [28, 56], [35, 40], [42, 26], [46, 14]], "hare": [[22, 94], [13, 86], [14, 72], [22, 58], [34, 48], [46, 42], [52, 32], [46, 3], [52, 1], [57, 26], [60, 24], [64, 1], [70, 3], [66, 28], [74, 34], [80, 40], [78, 45], [69, 48], [63, 56], [65, 74], [68, 93], [59, 93], [56, 82], [54, 92], [50, 95]], "bear": [[5, 54], [9, 38], [28, 30], [46, 21], [57, 24], [64, 22], [67, 16], [72, 22], [82, 26], [93, 34], [97, 41], [87, 46], [77, 50], [73, 62], [73, 91], [62, 91], [60, 72], [38, 72], [35, 91], [23, 91], [20, 73], [9, 67]], "dragon": [[2, 84], [6, 76], [12, 80], [22, 77], [34, 72], [42, 54], [26, 46], [10, 24], [26, 29], [22, 10], [36, 22], [40, 4], [48, 22], [56, 44], [60, 34], [62, 22], [66, 15], [63, 4], [71, 12], [84, 13], [93, 18], [84, 23], [72, 24], [68, 34], [66, 48], [72, 57], [78, 64], [67, 64], [62, 70], [62, 88], [67, 93], [52, 93], [50, 79], [38, 82], [24, 86], [10, 86]], "manticore": [[14, 91], [16, 70], [10, 56], [8, 44], [4, 30], [6, 14], [16, 4], [31, 6], [38, 14], [33, 20], [30, 13], [24, 11], [16, 12], [12, 20], [14, 32], [19, 44], [36, 44], [50, 40], [53, 26], [64, 19], [75, 24], [87, 32], [89, 40], [81, 46], [73, 56], [71, 91], [62, 91], [60, 65], [31, 65], [28, 91]]};

// Sample N points from a silhouette: ~40% on the outline, the rest inside.
export function sampleTotem(name, N, size = 4.1) {
  const pts = TOTEMS[name] || TOTEMS.wolf;
  const R = 200, c = document.createElement("canvas");
  c.width = c.height = R;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x * 2, y * 2) : g.moveTo(x * 2, y * 2)));
  g.closePath(); g.fill();
  const data = g.getImageData(0, 0, R, R).data;
  const on = (x, y) => x >= 0 && y >= 0 && x < R && y < R && data[(y * R + x) * 4 + 3] > 128;
  const fill = [], edge = [];
  for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
    if (!on(x, y)) continue;
    (on(x - 2, y) && on(x + 2, y) && on(x, y - 2) && on(x, y + 2) ? fill : edge).push(x, y);
  }
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const src = (i % 5 < 2 && edge.length) || !fill.length ? edge : fill;
    const k = ((Math.random() * src.length) / 2 | 0) * 2;
    const x = src[k] + Math.random(), y = src[k + 1] + Math.random();
    out[i * 3] = (x / R - 0.5) * size;
    out[i * 3 + 1] = -(y / R - 0.5) * size;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.16;
  }
  return out;
}
