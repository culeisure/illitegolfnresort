/* =========================================================
   일라이트 레인보우멤버십 안내 — 동작 스크립트
   인트로 / 스크롤 리빌 / 진행바 / 헤더 / 카운트업 / 트래킹
   ========================================================= */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 콘텐츠 보호: 우클릭 차단 ---------- */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  /* ---------- 1) 인트로 오버레이 (세션 첫 진입 1회) ---------- */
  (function () {
    var intro = document.getElementById("intro");
    if (!intro) return;

    var seen = false;
    try {
      seen = sessionStorage.getItem("illiteIntro") === "1";
    } catch (e) {}

    if (seen || reduce) {
      intro.classList.add("is-done");
      window.setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 100);
      return;
    }

    try {
      sessionStorage.setItem("illiteIntro", "1");
    } catch (e) {}

    document.documentElement.style.overflow = "hidden";
    window.setTimeout(function () {
      intro.classList.add("is-done");
      document.documentElement.style.overflow = "";
      window.setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 650);
    }, 1500);
  })();

  /* ---------- 2) 스크롤 리빌 (스태거) ---------- */
  (function () {
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.07 + "s";
      io.observe(el);
    });
  })();

  /* ---------- 3) 스크롤 진행바 + 헤더 고정 상태 ---------- */
  (function () {
    var bar = document.getElementById("progress");
    var head = document.getElementById("head");
    function onScroll() {
      var sc = window.scrollY || window.pageYOffset;
      if (bar) {
        var max =
          document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (sc / max) * 100 : 0) + "%";
      }
      if (head) head.classList.toggle("is-stuck", sc > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  })();

  /* ---------- 4) 숫자 카운트업 ---------- */
  (function () {
    function run(el) {
      var target = parseInt(el.getAttribute("data-target"), 10);
      if (!target) return;
      if (reduce) {
        el.textContent = String(target);
        return;
      }
      var dur = 1100;
      var start = performance.now();
      function step(now) {
        var p = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counts = document.querySelectorAll(".count");
    if (!("IntersectionObserver" in window)) {
      counts.forEach(run);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counts.forEach(function (el) {
      io.observe(el);
    });
  })();

  /* ---------- 5) 전환 트래킹 ----------
     전송 대상이 붙기 전까지 dataLayer 큐 + 콘솔.
     GA4 연결 시 gtag 줄 주석만 해제. */
  (function () {
    function sendEvent(name, params) {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: name, params: params });
        // if (typeof gtag === "function") gtag("event", name, params);
        if (window.console && console.info) {
          console.info("[track]", name, params);
        }
      } catch (e) {}
    }
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        sendEvent(el.getAttribute("data-track"), {
          position: el.getAttribute("data-track-pos") || "unknown",
          href: el.getAttribute("href") || ""
        });
      });
    });
  })();
})();
