/* Hagibor — Tron perspective grid background.
   Standalone: needs only <canvas id="grid"> in the page. */
(function () {
  "use strict";
  var canvas = document.getElementById("grid");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var motionQuery = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  var still = !!(motionQuery && motionQuery.matches);

  // Scene parameters (world units)
  var CAM_H = 1;          // camera height above the floor
  var CELL = 2.2;         // grid cell size
  var Z_FAR = 30;         // lines fade out completely by here
  var SPEED = 0.32;       // forward drift, units / second
  var FRONT_ALPHA = 0.2;  // strongest line opacity (closest to viewer)
  var CYAN = "92,225,255";

  var W = 0, H = 0, dpr = 1, horizon = 0, focal = 0, zNear = 1, depthGrad = null;
  var cycles = [], nextCycle = 2.5, last = 0, t = 0, raf = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    horizon = H * 0.4;
    focal = Math.max(H * 0.95, W * 0.55);
    zNear = (focal * CAM_H) / (H - horizon);

    // One vertical gradient encodes depth fade for every line (depth depends only on screen y).
    depthGrad = ctx.createLinearGradient(0, horizon, 0, H);
    var steps = 14;
    for (var i = 0; i <= steps; i++) {
      var y = horizon + ((H - horizon) * i) / steps;
      depthGrad.addColorStop(i / steps, "rgba(" + CYAN + "," + depthAlpha(depthAt(y)).toFixed(4) + ")");
    }
    if (still) draw(0);
  }

  function depthAt(y) {
    var d = y - horizon;
    return d <= 0.5 ? Z_FAR : (focal * CAM_H) / d;
  }
  function depthAlpha(z) {
    var k = (z - zNear) / (Z_FAR - zNear);
    k = Math.min(1, Math.max(0, k));
    return FRONT_ALPHA * Math.pow(1 - k, 2.2);
  }
  function project(x, z, camX) {
    return { x: W / 2 + (focal * (x - camX)) / z, y: horizon + (focal * CAM_H) / z };
  }

  function spawnCycle() {
    var lane = Math.round((Math.random() - 0.5) * 8);
    cycles.push({
      lane: lane,
      z: zNear * 0.6,
      speed: 3.2 + Math.random() * 2.2,
      tail: 2.8 + Math.random() * 2,
      color: CYAN
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    // Organic camera sway: two slow, unrelated sines.
    var camX = Math.sin(time * 0.071) * 0.55 + Math.sin(time * 0.033 + 1.7) * 0.35;
    var phase = (time * SPEED) % CELL;

    ctx.lineWidth = 1;
    ctx.strokeStyle = depthGrad;

    // Horizontal lines, drifting away toward the horizon
    ctx.beginPath();
    for (var z = phase; z < Z_FAR; z += CELL) {
      if (z < zNear) continue;
      var y = Math.round(horizon + (focal * CAM_H) / z) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();

    // Converging lines, each breathing slightly on its own rhythm
    var halfFar = ((W / 2) * Z_FAR) / focal + Math.abs(camX);
    var n = Math.ceil(halfFar / CELL);
    for (var i = -n; i <= n; i++) {
      var x = i * CELL;
      var a = project(x, Z_FAR, camX);
      var b = project(x, zNear * 0.999, camX);
      // extend to the bottom edge
      var by = H, bx = a.x + ((b.x - a.x) * (by - a.y)) / (b.y - a.y);
      var lateral = Math.min(1, Math.abs(x - camX) / (halfFar * 0.9));
      var breathe = 0.78 + 0.22 * Math.sin(time * 0.4 + i * 1.37);
      ctx.globalAlpha = Math.max(0, (1 - lateral * 0.7) * breathe);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Light cycles riding the grid lanes
    if (cycles.length) {
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (var c = 0; c < cycles.length; c++) {
        var cy = cycles[c];
        var lx = cy.lane * CELL;
        var head = project(lx, Math.min(cy.z, Z_FAR), camX);
        var tail = project(lx, Math.max(cy.z - cy.tail, zNear * 0.6), camX);
        var fade = Math.max(0, Math.min(1, (Z_FAR - cy.z) / 8)) * Math.min(1, (cy.z - zNear * 0.6) / 1.5);
        var g = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g.addColorStop(0, "rgba(" + cy.color + ",0)");
        g.addColorStop(1, "rgba(" + cy.color + "," + (0.55 * fade).toFixed(3) + ")");
        ctx.strokeStyle = g;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.35;
        ctx.beginPath(); ctx.moveTo(tail.x, tail.y); ctx.lineTo(head.x, head.y); ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 1;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "butt";
    }
  }

  function step(dt) {
    t += dt;
    nextCycle -= dt;
    if (nextCycle <= 0 && cycles.length < 2) {
      spawnCycle();
      nextCycle = 5 + Math.random() * 7;
    }
    for (var i = cycles.length - 1; i >= 0; i--) {
      cycles[i].z += cycles[i].speed * dt;
      if (cycles[i].z - cycles[i].tail > Z_FAR) cycles.splice(i, 1);
    }
  }

  function loop(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    step(dt);
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    cancelAnimationFrame(raf);
    last = 0;
    if (still) { cycles.length = 0; draw(0); return; }
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelAnimationFrame(raf); else start();
  });
  if (motionQuery && motionQuery.addEventListener) {
    motionQuery.addEventListener("change", function (e) { still = e.matches; start(); });
  }
  resize();
  start();
})();
