(() => {
  const D = window.FLAMINGO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);
  const singkat = (n) => n >= 1e6
    ? (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " jt"
    : Math.round(n / 1e3) + "rb";

  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");
  if (!reduce) {
    root.classList.add("seq", "intro");
    setTimeout(() => root.classList.remove("intro"), 2600);
  }

  /* ---------- ikon flat (tanpa garis tepi) ---------- */
  const ICON_CEK = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle class="ico-l" cx="10" cy="10" r="10"/><path class="ico-p" d="M4.9 10.3l1.7-1.7 2.2 2.2 4.6-4.6 1.7 1.7-6.3 6.3z"/></svg>';
  const ICON_PLUS = '<svg viewBox="0 0 22 22" aria-hidden="true"><rect class="ico-p" x="2" y="9.5" width="18" height="3" rx="1.5"/><rect class="ico-p v" x="9.5" y="2" width="3" height="18" rx="1.5"/></svg>';

  /* ---------- HARGA ---------- */
  $("#incl").innerHTML =
    '<span class="incl__label">Semua paket sudah termasuk</span>' +
    D.semuaPaket.map((x) => `<span class="chip">${ICON_CEK}${x}</span>`).join("");

  $("#paket").innerHTML = D.paket.map((p, i) => `
    <article class="nota${p.rekomendasi ? " nota--rec" : ""} reveal" style="--d:${i}">
      <div class="nota__paper">
        <div class="nota__top">
          <h3 class="nota__name">${p.nama}</h3>
          ${p.rekomendasi ? '<span class="badge">Rekomendasi</span>' : ""}
        </div>
        <p class="nota__for">${p.untuk}</p>
        <div class="nota__price"><span class="nota__rp">Rp</span><strong class="nota__num" data-full="${p.harga}">${rupiah(p.harga)}</strong></div>
        <p class="nota__note" data-durasi="${p.durasi}">${p.durasi}</p>
        <hr class="dash">
        <ul class="nota__list">${p.isi.map((x) => `<li>${ICON_CEK}<span>${x}</span></li>`).join("")}</ul>
        <a class="btn btn--block ${p.rekomendasi ? "btn--pink" : "btn--ink"}" data-wa
           data-wa-msg="Halo Flamingo Site, saya tertarik dengan paket ${p.nama}." href="#kontak">Pilih ${p.nama}</a>
      </div>
    </article>`).join("");

  const k = D.kustom;
  $("#kustom").innerHTML = `
    <div>
      <h3>${k.nama}</h3>
      <p>${k.kalimat}</p>
      <div class="custom__tags">${k.contoh.map((c) => `<span>${c}</span>`).join("")}</div>
    </div>
    <div class="custom__right">
      <p class="custom__from">Mulai dari</p>
      <div class="nota__price"><span class="nota__rp">Rp</span><strong class="nota__num">${rupiah(k.mulai)}</strong></div>
      <a class="btn btn--pink" data-wa data-wa-msg="Halo Flamingo Site, saya mau konsultasi soal sistem kustom." href="#kontak">Ceritakan kebutuhanmu</a>
    </div>
    <svg class="custom__mark" viewBox="0 0 64 64" aria-hidden="true"><polygon points="16,6 52,32 16,58 16,44 33,32 16,20" fill="#F45B85"/></svg>`;
  $("#kustom").classList.add("reveal");

  $("#tambahan").innerHTML = D.tambahan
    .map((t) => `<li><span>${t.nama}</span><strong>Rp${rupiah(t.harga)} <small>${t.satuan}</small></strong></li>`)
    .join("");

  // Bayar lunas / cicil 3 tahap
  const setMode = (mode) => {
    $$(".seg__btn").forEach((b) => {
      const on = b.dataset.mode === mode;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-checked", on);
    });
    $$("#paket .nota").forEach((card) => {
      const num = $(".nota__num", card);
      const note = $(".nota__note", card);
      const full = +num.dataset.full;
      const tahap = D.termin.map((t) => (full * t.persen) / 100);
      if (mode === "cicil") {
        num.textContent = rupiah(tahap[0]);
        note.textContent = `DP ${D.termin[0].persen}%, lalu ${tahap.slice(1).map(singkat).join(" + ")}`;
      } else {
        num.textContent = rupiah(full);
        note.textContent = note.dataset.durasi;
      }
      num.classList.remove("flip");
      void num.offsetWidth;
      num.classList.add("flip");
    });
  };
  $$(".seg__btn").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));

  /* ---------- KARYA ---------- */
  const shot = (inner, cap, url) => {
    const tag = url ? `a href="${url}" target="_blank" rel="noopener"` : "div";
    return `<${tag} class="shot reveal">
      <div class="shot__frame"><div class="shot__bar"><i></i><i></i><i></i><span></span></div><div class="shot__img">${inner}</div></div>
      <div class="shot__cap">${cap}</div>
    </${url ? "a" : "div"}>`;
  };
  const grid = $("#karyaGrid");
  if (D.karya.length) {
    grid.innerHTML = D.karya.map((w) => shot(
      `<img src="${w.gambar}" alt="Tampilan website ${w.nama}" loading="lazy" decoding="async">`,
      `<h3>${w.nama}</h3><p>${w.kategori || ""}</p>`,
      w.url
    )).join("");
  } else {
    const contoh = [["Kuliner", "#F45B85"], ["Jasa", "#FF9A7A"], ["Toko online", "#D93A74"]];
    grid.innerHTML = contoh.map(([kat, tone]) => shot(
      `<div class="wire" style="--tone:${tone}">
        <div><i class="t"></i><i class="t2"></i><i class="s"></i><i class="s2"></i><i class="b"></i></div>
        <div class="pic"><svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="208" cy="92" r="38" fill="#FF9A7A"/><path d="M0 300V196l72-52 62 46 52-32 114 74v68z" fill="${tone}"/><path d="M0 300v-46l92-40 70 30 62-22 76 32v46z" fill="#2B1B2E" opacity=".9"/></svg></div>
      </div>`,
      `<h3>Segera tayang</h3><p>${kat}</p>`
    )).join("");
  }
  $$(".shot", grid).forEach((el, i) => el.style.setProperty("--d", i));

  /* ---------- FAQ ---------- */
  $("#faqList").innerHTML = D.faq
    .map((f) => `<details class="qa"><summary>${f.t}${ICON_PLUS}</summary><p>${f.j}</p></details>`)
    .join("");

  /* ---------- kontak ---------- */
  const waUrl = (msg) => `https://wa.me/${D.kontak.wa}?text=${encodeURIComponent(msg || D.kontak.pesanWa)}`;
  $$("[data-wa]").forEach((a) => {
    a.href = waUrl(a.dataset.waMsg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  if (D.kontak.instagram) $("#igLink").href = `https://instagram.com/${D.kontak.instagram}`;
  else $("#igLink").hidden = true;
  if (D.kontak.email) { $("#mailLink").href = `mailto:${D.kontak.email}`; $("#mailLink").hidden = false; }
  $("#year").textContent = new Date().getFullYear();

  /* ---------- kalimat yang menyala per kata ---------- */
  const say = $("#sayText");
  const wrapWords = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else { const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrapWords(n);
    });
  };
  let words = [];
  if (!reduce) { wrapWords(say); words = $$(".w", say); }

  /* ---------- muncul saat discroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- header + menu ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const hero = $(".hero");
  const stage = $(".hero__stage");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- HERO: gelap ke pink, teks lewat di belakang flamingo ---------- */
  const ticker = $(".hero__ticker");
  let mx = 0, my = 0, tx = 0, ty = 0;
  if (!reduce && matchMedia("(pointer: fine)").matches) {
    stage.addEventListener("pointermove", (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    });
    stage.addEventListener("pointerleave", () => { tx = 0; ty = 0; });
  }

  let ticking = false;
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  const frame = () => {
    ticking = false;
    const vh = innerHeight;
    const hr = hero.getBoundingClientRect();
    nav.classList.toggle("is-solid", hr.bottom < vh - 2);

    if (!reduce) {
      const total = Math.max(1, hero.offsetHeight - stage.offsetHeight);
      const p = clamp(-hr.top / total, 0, 1);
      const pink = smooth(0.16, 0.52, p);
      const s = stage.style;
      s.setProperty("--photo", (1 - pink).toFixed(3));
      s.setProperty("--pinkO", pink.toFixed(3));
      s.setProperty("--tc", pink.toFixed(3));
      s.setProperty("--one", (1 - smooth(0.06, 0.3, p)).toFixed(3));
      s.setProperty("--two", smooth(0.44, 0.66, p).toFixed(3));
      s.setProperty("--run", (p * innerWidth * 0.4).toFixed(1));
      s.setProperty("--zoom", (1 + p * 0.045).toFixed(4));
      stage.classList.toggle("is-two", p > 0.44);
      nav.classList.toggle("on-pink", pink > 0.5);

      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      s.setProperty("--mx", (mx * -10).toFixed(2) + "px");
      s.setProperty("--my", (my * -7).toFixed(2) + "px");
      ticker.style.translate = `${(mx * 18).toFixed(2)}px ${(my * 10).toFixed(2)}px`;

      if (words.length) {
        const r = say.getBoundingClientRect();
        const q = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.32), 0, 1);
        const n = Math.round(q * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      }
      if (Math.abs(tx - mx) + Math.abs(ty - my) > 0.002) kick();
    }
  };
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", kick);
  stage.addEventListener("pointermove", kick);
  stage.addEventListener("pointerleave", kick);
  kick();
})();
