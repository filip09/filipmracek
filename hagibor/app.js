/* Hagibor — content, language switch, interactive title. */
(function () {
  "use strict";

  var IMG_BASE = "https://filipmracek.com/hagibor/hagiborgallery/";
  var BOOKING_PAGE = "rezervace.html";

  var T = {
    cs: {
      docTitle: "Sportovní hala Hagibor · Praha 10",
      title: ["SPORTOVNÍ HALA", "HAGIBOR"],
      tagline: "Pronájem sportovních hal · <b>Praha 10</b>",
      infoEyebrow: "Hala v kostce",
      hallsTitle: "Tělocvičny k pronájmu",
      contactTitle: "Kontakt",
      address: "Adresa",
      addressValue: "Izraelská 3160/6, Praha 10",
      email: "E-mail",
      phone: "Telefon",
      openMap: "Otevřít v mapách",
      writeUs: "Napsat e-mail",
      callUs: "Zavolat",
      credit: "Web by",
      bookOnce: "Objednat jednorázově",
      bookLong: "Objednat dlouhodobě",
      perHour: "Kč / hod",
      exVat: "bez DPH",
      inVat: "včetně DPH",
      currencyBefore: false,
      photo: "Fotografie",
      facts: [
        { ico: "clock", label: "Otevírací doba", value: "8:00 – 22:00", big: true },
        { ico: "park", label: "Parkování", value: "Přímo před halou" },
        { ico: "metro", label: "Metro A · Želivského", value: "7 minut pěšky", metro: true },
        { ico: "light", label: "Obě haly", value: "Opravený povrch a osvětlení" },
        { ico: "cup", label: "Automaty", value: "Káva, nápoje a občerstvení" },
        { ico: "bar", label: "Klubový bar", value: "Otevřený ve středu" }
      ],
      halls: [
        {
          id: 1, name: "HALA 1", area: "690 m²", net: 1200, gross: 1344, img: "hala1.webp",
          surface: "Nový sportovní PVC povrch", tag: "od 09/2024",
          sports: [["FLORBAL", "permanentně postavené mantinely"], ["BASKETBAL"]]
        },
        {
          id: 2, name: "HALA 2", area: "690 m²", net: 1200, gross: 1344, img: "hala2.webp",
          surface: "Nový parketový povrch", tag: "od 09/2024",
          sports: [["FLORBAL", "permanentně postavené mantinely"], ["FUTSAL"], ["HÁZENÁ"], ["VOLEJBAL"], ["NESPORTOVNÍ AKCE"]]
        },
        {
          id: 3, name: "MALÝ SÁL", area: "75 m²", net: 600, gross: 672, img: "hala3.webp",
          surface: "Sportovní PVC povrch",
          sports: [["MENŠÍ SPORTY", "bojová umění, jóga apod."]]
        }
      ]
    },
    en: {
      docTitle: "Hagibor Sports Hall · Prague 10",
      title: ["SPORTS HALL", "HAGIBOR"],
      tagline: "Sports hall rental · <b>Prague 10</b>",
      infoEyebrow: "At a glance",
      hallsTitle: "Halls for rent",
      contactTitle: "Contact",
      address: "Address",
      addressValue: "Izraelská 3160/6, Prague 10",
      email: "E-mail",
      phone: "Phone",
      openMap: "Open in maps",
      writeUs: "Send an e-mail",
      callUs: "Call us",
      credit: "Web by",
      bookOnce: "Book once",
      bookLong: "Book long-term",
      perHour: "/ hour",
      exVat: "excl. VAT",
      inVat: "incl. VAT",
      currencyBefore: true,
      photo: "Photo",
      facts: [
        { ico: "clock", label: "Opening hours", value: "8:00 – 22:00", big: true },
        { ico: "park", label: "Parking", value: "Right in front of the hall" },
        { ico: "metro", label: "Metro A · Želivského", value: "7 min walk", metro: true },
        { ico: "light", label: "Both halls", value: "Renovated floors and lighting" },
        { ico: "cup", label: "Vending machines", value: "Coffee, drinks and snacks" },
        { ico: "bar", label: "Club bar", value: "Open on Wednesdays" }
      ],
      halls: [
        {
          id: 1, name: "HALL 1", area: "690 m²", net: 1200, gross: 1344, img: "hala1.webp",
          surface: "New sports PVC floor", tag: "since 09/2024",
          sports: [["FLOORBALL", "permanent rink boards"], ["BASKETBALL"]]
        },
        {
          id: 2, name: "HALL 2", area: "690 m²", net: 1200, gross: 1344, img: "hala2.webp",
          surface: "New parquet floor", tag: "since 09/2024",
          sports: [["FLOORBALL", "permanent rink boards"], ["FUTSAL"], ["HANDBALL"], ["VOLLEYBALL"], ["NON-SPORTS EVENTS"]]
        },
        {
          id: 3, name: "SMALL HALL", area: "75 m²", net: 600, gross: 672, img: "hala3.webp",
          surface: "Sports PVC floor",
          sports: [["SMALLER SPORTS", "martial arts, yoga and similar"]]
        }
      ]
    }
  };

  var ICONS = {
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    park: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3"/>',
    metro: '<rect x="5" y="3.5" width="14" height="13" rx="3"/><path d="M5 11h14M9 20l-2 1.5M15 20l2 1.5"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
    light: '<path d="M12 3v2.5M4.6 6.1l1.8 1.8M19.4 6.1l-1.8 1.8M3 21h18"/><path d="M7 21a5 5 0 0 1 10 0"/><path d="M12 9.5v3.5"/>',
    cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3.5c-.8 1 .8 2-.1 3M12 3.5c-.8 1 .8 2-.1 3"/>',
    bar: '<path d="M5 4h14l-7 8z"/><path d="M12 12v8M8 20h8M8.5 8h7"/>'
  };

  var CHECK = '<svg class="check" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="6"/><path d="M6.5 12.3l3.7 3.7 7.3-8"/></svg>';

  /* ---------------- language ---------------- */
  var lang = detectLang();

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem("hagibor-lang"); } catch (e) {}
    if (saved === "cs" || saved === "en") return saved;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    var first = String(list[0] || "en").toLowerCase();
    return (first.indexOf("cs") === 0 || first.indexOf("sk") === 0) ? "cs" : "en";
  }

  function fmt(n) {
    var s = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "cs" ? " " : ",");
    return s;
  }

  function priceHTML(t, h) {
    var unit = t.currencyBefore ? "CZK" : "";
    var main = t.currencyBefore
      ? '<span class="unit">' + unit + '</span><strong>' + fmt(h.net) + '</strong><span class="unit">' + t.perHour + '</span>'
      : '<strong>' + fmt(h.net) + '</strong><span class="unit">' + t.perHour + '</span>';
    var gross = t.currencyBefore ? "CZK " + fmt(h.gross) + " " + t.perHour : fmt(h.gross) + " " + t.perHour;
    return '<div class="price">' +
      '<div class="price-main">' + main + '<span class="price-note">' + t.exVat + '</span></div>' +
      '<div class="price-vat"><b>' + gross + '</b> ' + t.inVat + '</div>' +
      '</div>';
  }

  function render() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.title = t.docTitle;

    document.querySelectorAll("[data-t]").forEach(function (el) {
      var v = t[el.getAttribute("data-t")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    // facts
    document.getElementById("facts").innerHTML = t.facts.map(function (f) {
      var label = f.metro ? '<span class="line-a" aria-hidden="true">A</span>' + f.label : f.label;
      return '<li class="fact"><span class="fact-ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[f.ico] + '</svg></span>' +
        '<span><span class="fact-label">' + label + '</span><span class="fact-value' + (f.big ? " big" : "") + '">' + f.value + '</span></span></li>';
    }).join("");

    // halls
    var halls = document.getElementById("halls");
    halls.innerHTML = t.halls.map(function (h) {
      var sports = h.sports.map(function (s) {
        return '<li>' + CHECK + '<span><span class="sport-name">' + s[0] + '</span>' +
          (s[1] ? '<span class="sport-note">' + s[1] + '</span>' : "") + '</span></li>';
      }).join("");
      var href = function (type) {
        return BOOKING_PAGE + "?hala=" + h.id + "&typ=" + type + "&lang=" + lang;
      };
      return '<article class="hall" data-hall="' + h.id + '">' +
        '<div class="frame"><div class="shot">' +
        '<img src="' + IMG_BASE + h.img + '" alt="' + t.photo + ': ' + h.name + '" loading="lazy" decoding="async">' +
        '<span class="shot-fallback" aria-hidden="true">' + h.name + '</span></div></div>' +
        '<div class="hall-body">' +
        '<header class="hall-head"><h3 class="hall-name">' + h.name + '</h3><span class="hall-area">' + h.area + '</span></header>' +
        priceHTML(t, h) +
        '<p class="surface">' + h.surface + (h.tag ? '<span class="tag">' + h.tag + '</span>' : "") + '</p>' +
        '<ul class="sports">' + sports + '</ul>' +
        '<div class="actions">' +
        '<a class="btn btn-solid" href="' + href("jednorazove") + '">' + t.bookOnce + '</a>' +
        '<a class="btn btn-line" href="' + href("dlouhodobe") + '">' + t.bookLong + '</a>' +
        '</div></div></article>';
    }).join("");

    halls.querySelectorAll(".shot img").forEach(function (img) {
      var fail = function () { img.parentNode.classList.add("noimg"); };
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
    });
    watchChecks();
    buildTitle(t.title);
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("hagibor-lang", lang); } catch (e) {}
    render();
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ------------- check marks draw when a card scrolls in ------------- */
  var io = null;
  function watchChecks() {
    if (!("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.remove("await");
          e.target.classList.add("lit");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    document.querySelectorAll(".hall").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) el.classList.add("await");
      else el.classList.add("lit");
      io.observe(el);
    });
  }

  /* ---------------- interactive title ---------------- */
  var NS = "http://www.w3.org/2000/svg";
  var FS = 100;            // font size in SVG units
  var DASH = 460;          // dash length per glyph contour
  var FWD = 1 / 1.5;       // progress per second while drawing
  var BACK = 1 / 2.4;      // progress per second while rewinding (hover)
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var glyphs = [];
  var running = false, lastT = 0;
  var fontsReady = (document.fonts && document.fonts.load)
    ? Promise.race([
        Promise.all([
          document.fonts.load('800 100px "Orbitron"'),
          document.fonts.load('600 100px "Orbitron"')
        ]),
        new Promise(function (r) { setTimeout(r, 2500); })
      ])
    : Promise.resolve();

  function buildTitle(lines) {
    fontsReady.then(function () { buildNow(lines); });
  }

  function buildNow(lines) {
    var host = document.getElementById("title");
    var sr = '<span class="title-sr">' + lines.join(" ") + "</span>";
    host.innerHTML = sr;
    glyphs = [];
    var order = 0;
    lines.forEach(function (line, li) {
      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "tline tline-" + li);
      svg.setAttribute("aria-hidden", "true");
      host.appendChild(svg);
      var track = li === 0 ? FS * 0.34 : FS * 0.12;
      var hasAccent = /[ÁÉÍÓÚÝČĚŠŘŽ]/.test(line);
      var top = hasAccent ? FS * 0.08 : FS * 0.22;
      var base = FS * 0.95;
      var x = 0;
      var chars = Array.from(line);
      chars.forEach(function (ch) {
        if (ch === " ") { x += FS * (li === 0 ? 0.55 : 0.45); return; }
        var t = document.createElementNS(NS, "text");
        t.textContent = ch;
        t.setAttribute("x", x);
        t.setAttribute("y", base);
        t.setAttribute("font-size", FS);
        svg.appendChild(t);
        var w = t.getComputedTextLength() || FS * 0.8;
        var hit = document.createElementNS(NS, "rect");
        hit.setAttribute("x", x - track / 2);
        hit.setAttribute("y", top);
        hit.setAttribute("width", w + track);
        hit.setAttribute("height", base - top + FS * 0.08);
        svg.appendChild(hit);
        var len = measureOutline(t, ch);
        var g = { el: t, len: len, p: reduce ? 1 : -0.18 - order * 0.075, hover: false };
        t.style.strokeDasharray = len + " " + len * 2;
        bindHover(hit, g);
        glyphs.push(g);
        paint(g);
        order++;
        x += w + track;
      });
      var width = x - track;
      svg.setAttribute("viewBox", "0 " + top + " " + width + " " + (base - top + FS * 0.06));
    });
    kick();
  }

  // Real outline length of one glyph: stroke it 1px wide on a canvas and sum the ink.
  var mctx = null;
  function measureOutline(textEl, ch) {
    try {
      var cs = getComputedStyle(textEl);
      if (!mctx) mctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      var c = mctx.canvas, size = FS * 2;
      c.width = size; c.height = size;
      mctx.clearRect(0, 0, size, size);
      mctx.font = cs.fontWeight + " " + FS + "px " + cs.fontFamily;
      mctx.lineWidth = 1;
      mctx.lineJoin = "round";
      mctx.strokeStyle = "#000";
      mctx.strokeText(ch, FS * 0.3, FS * 1.4);
      var d = mctx.getImageData(0, 0, size, size).data, sum = 0;
      for (var i = 3; i < d.length; i += 4) sum += d[i];
      var len = sum / 255;
      if (len > 40) return Math.ceil(len * 1.04 + 4);
    } catch (e) {}
    return DASH * 2;
  }

  function bindHover(hit, g) {
    hit.addEventListener("pointerenter", function () { g.hover = true; kick(); });
    hit.addEventListener("pointerleave", function () { g.hover = false; kick(); });
    hit.addEventListener("pointercancel", function () { g.hover = false; kick(); });
    hit.addEventListener("pointerup", function (e) {
      if (e.pointerType !== "mouse") { g.hover = false; kick(); }
    });
  }

  function smooth(a, b, v) {
    var k = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return k * k * (3 - 2 * k);
  }

  function paint(g) {
    var p = Math.min(1, Math.max(0, g.p));
    var eased = 1 - Math.pow(1 - p, 2.2);
    var el = g.el.style;
    // Dash pattern stays on permanently, so drawing and un-drawing use one continuous mapping.
    el.strokeDashoffset = String(g.len * (1 - eased));
    el.fillOpacity = String(smooth(0.72, 1, p) * 0.16);
    el.strokeOpacity = String(0.35 + 0.65 * smooth(0, 0.25, p));
  }

  function kick() {
    if (running) return;
    running = true;
    lastT = 0;
    requestAnimationFrame(tick);
  }

  function tick(now) {
    var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0;
    lastT = now;
    var active = false;
    for (var i = 0; i < glyphs.length; i++) {
      var g = glyphs[i];
      var target = g.hover ? 0 : 1;
      if (g.hover) {
        if (g.p > 0) { g.p = Math.max(0, g.p - BACK * dt * (reduce ? 4 : 1)); active = true; }
      } else if (g.p < 1) {
        g.p = Math.min(1, g.p + FWD * dt * (reduce ? 4 : 1)); active = true;
      }
      if (g.p !== target || active) paint(g);
    }
    if (active) requestAnimationFrame(tick);
    else running = false;
  }

  render();
})();
