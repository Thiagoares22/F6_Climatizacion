/* =====================================================================
   F6 Climatización - Lógica del sitio
   ---------------------------------------------------------------------
   Vanilla JS, sin dependencias. Se divide en:
     1. Utilidades
     2. Navegación y menú lateral
     3. Renderizado de contenido (desde DATOS)
     4. Galería y lightbox
     5. Carrusel de testimonios
     6. Acordeón de preguntas
     7. Contadores animados
     8. Formulario y avisos
     9. Scroll: progreso, header y enlace activo
   ===================================================================== */

(function () {
  "use strict";

  const D = window.DATOS;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* -------------------------------------------------------------
     1. Utilidades
     ------------------------------------------------------------- */
  const imgUnsplash = (id, ancho, alto) =>
    `https://images.unsplash.com/${id}?w=${ancho}&q=70&auto=format&fit=crop&fm=jpg${alto ? `&h=${alto}` : ""}`;

  /* Acepta tanto IDs de Unsplash como rutas locales (ej: "./f6 imagenes/foto.jpg") */
  const esRutaLocal = (id) => /^(\.{0,2}\/|https?:|data:)/.test(id);
  const imgSrc = (id, ancho, alto) =>
    esRutaLocal(id) ? id : imgUnsplash(id, ancho, alto);

  const formatearPrecio = (n) =>
    new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Enfocar un elemento recién visible: hay que esperar a que el navegador
  // aplique el nuevo estilo (visibility) antes de llamar a focus().
  const enfocar = (el) => {
    if (!el || !el.focus) return;
    const aplicar = () => el.focus();
    requestAnimationFrame(() => requestAnimationFrame(aplicar));
    window.setTimeout(aplicar, 100); // red de seguridad
  };

  /* -------------------------------------------------------------
     2. Navegación: menú lateral móvil
     ------------------------------------------------------------- */
  function initMenuMovil() {
    const boton = $("#hamburguesa");
    const panel = $("#panelMovil");
    const overlay = $("#overlay");
    const cerrar = $("#cerrarPanel");
    if (!boton || !panel || !overlay) return;

    let ultimoFoco = null;

    const abrir = () => {
      ultimoFoco = document.activeElement;
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("visible"));
      panel.classList.add("abierto");
      panel.setAttribute("aria-hidden", "false");
      panel.inert = false;
      boton.setAttribute("aria-expanded", "true");
      document.body.classList.add("sin-scroll");
      enfocar($("a, button", panel));
    };

    const cerrarPanel = () => {
      overlay.classList.remove("visible");
      panel.classList.remove("abierto");
      panel.setAttribute("aria-hidden", "true");
      panel.inert = true;
      boton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("sin-scroll");
      window.setTimeout(() => { overlay.hidden = true; }, 240);
      if (ultimoFoco) ultimoFoco.focus();
    };

    boton.addEventListener("click", () =>
      panel.classList.contains("abierto") ? cerrarPanel() : abrir()
    );
    cerrar.addEventListener("click", cerrarPanel);
    overlay.addEventListener("click", cerrarPanel);

    // Cerrar al navegar a una sección
    $$("#panelEnlaces a").forEach((a) => a.addEventListener("click", cerrarPanel));

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("abierto")) cerrarPanel();
    });

    // Mantener el foco dentro del panel abierto
    panel.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !panel.classList.contains("abierto")) return;
      const focusables = $$("a[href], button:not([disabled])", panel)
        .filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    });
  }

  /* -------------------------------------------------------------
     3. Renderizado del contenido
     ------------------------------------------------------------- */
  function renderServicios() {
    const cont = $("#rejillaServicios");
    if (!cont) return;
    cont.innerHTML = D.SERVICIOS.map((s) => {
      const lista = s.lista
        .map((i) => `<li><svg aria-hidden="true"><use href="#i-check"></use></svg>${escapeHTML(i)}</li>`)
        .join("");
      return `
      <article class="servicio revelar">
        <span class="servicio__icono"><svg aria-hidden="true"><use href="#${s.icono}"></use></svg></span>
        <h3>${escapeHTML(s.titulo)}</h3>
        <p>${escapeHTML(s.texto)}</p>
        <ul class="servicio__lista">${lista}</ul>
        <a class="servicio__enlace" href="#contacto">
          ${escapeHTML(s.enlace)} <svg aria-hidden="true"><use href="#i-arrow-right"></use></svg>
        </a>
      </article>`;
    }).join("");
  }

  function renderGaleria() {
    const cont = $("#rejillaGaleria");
    if (!cont) return;
    cont.innerHTML = D.GALERIA.map((g, i) => `
      <button class="galeria-item revelar" type="button" data-indice="${i}" aria-label="Ver imagen: ${escapeHTML(g.titulo)}">
        <img src="${imgSrc(g.img, 900, 700)}" alt="${escapeHTML(g.titulo)}" loading="lazy" decoding="async">
        <span class="galeria-item__zoom"><svg aria-hidden="true"><use href="#i-zoom"></use></svg></span>
        <span class="galeria-item__info">
          <strong>${escapeHTML(g.titulo)}</strong>
          <span>${escapeHTML(g.lugar)}</span>
        </span>
      </button>`).join("");
  }

  function renderTestimonios() {
    const pista = $("#carruselPista");
    if (!pista) return;

    pista.innerHTML = D.TESTIMONIOS.map((t) => {
      const estrellas = Array.from({ length: 5 })
        .map((_, i) =>
          `<svg aria-hidden="true" style="${i < t.estrellas ? "" : "opacity:.25"}"><use href="#i-star"></use></svg>`
        ).join("");
      return `
      <div class="testimonio">
        <figure class="testimonio__tarjeta">
          <div class="testimonio__estrellas" aria-label="${t.estrellas} de 5 estrellas">${estrellas}</div>
          <blockquote class="testimonio__texto">${escapeHTML(t.texto)}</blockquote>
          <figcaption class="testimonio__autor">
            <img class="testimonio__avatar" src="${imgUnsplash(t.foto, 120, 120)}"
                 alt="" aria-hidden="true" loading="lazy" decoding="async">
            <span class="testimonio__datos">
              <strong>${escapeHTML(t.nombre)}</strong>
              <span>${escapeHTML(t.lugar)}</span>
            </span>
          </figcaption>
        </figure>
      </div>`;
    }).join("");
  }

  function renderFaq() {
    const cont = $("#listaFaq");
    if (!cont) return;
    cont.innerHTML = D.FAQ.map((f, i) => `
      <div class="faq-item revelar">
        <h3 style="margin:0">
          <button class="faq-item__pregunta" type="button" aria-expanded="false" aria-controls="faq-resp-${i}">
            <span>${escapeHTML(f.p)}</span>
            <span class="faq-item__icono"><svg aria-hidden="true"><use href="#i-chevron-down"></use></svg></span>
          </button>
        </h3>
        <div class="faq-item__respuesta" id="faq-resp-${i}" role="region">
          <div><p>${escapeHTML(f.r)}</p></div>
        </div>
      </div>`).join("");
  }

  function renderArticulos() {
    const cont = $("#rejillaArticulos");
    if (!cont) return;
    cont.innerHTML = D.ARTICULOS.map((a) => `
      <article class="articulo revelar">
        <div class="articulo__media">
          <img src="${imgSrc(a.img, 900, 506)}" alt="" aria-hidden="true" loading="lazy" decoding="async">
          <span class="articulo__cat">${escapeHTML(a.categoria)}</span>
        </div>
        <div class="articulo__cuerpo">
          <span class="articulo__fecha">
            <svg aria-hidden="true"><use href="#i-calendar"></use></svg>${escapeHTML(a.fecha)}
          </span>
          <h3>${escapeHTML(a.titulo)}</h3>
          <p>${escapeHTML(a.extracto)}</p>
          <a class="articulo__enlace" href="#contacto">
            Leer más <svg aria-hidden="true"><use href="#i-arrow-right"></use></svg>
          </a>
        </div>
      </article>`).join("");
  }

  /* -------------------------------------------------------------
     4. Galería y lightbox
     ------------------------------------------------------------- */
  function initLightbox() {
    const cont = $("#rejillaGaleria");
    const lb = $("#lightbox");
    if (!cont || !lb) return;

    const img = $("#lbImg");
    const titulo = $("#lbTitulo");
    const contador = $("#lbContador");
    let indice = 0;
    let focoPrevio = null;

    const mostrar = (i) => {
      indice = (i + D.GALERIA.length) % D.GALERIA.length;
      const g = D.GALERIA[indice];
      img.src = imgSrc(g.img, 1600, 1100);
      img.alt = g.titulo;
      titulo.textContent = `${g.titulo} · ${g.lugar}`;
      contador.textContent = `${indice + 1} / ${D.GALERIA.length}`;
    };

    const abrir = (i) => {
      mostrar(i);
      if (!lb.classList.contains("visible")) focoPrevio = document.activeElement;
      lb.classList.add("visible");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("sin-scroll");
      enfocar($("#lbCerrar"));
    };

    const cerrar = () => {
      lb.classList.remove("visible");
      lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sin-scroll");
      if (focoPrevio) { enfocar(focoPrevio); focoPrevio = null; }
    };

    cont.addEventListener("click", (e) => {
      const item = e.target.closest(".galeria-item");
      if (item) abrir(Number(item.dataset.indice));
    });

    $("#lbCerrar").addEventListener("click", cerrar);
    $("#lbPrev").addEventListener("click", (e) => { e.stopPropagation(); mostrar(indice - 1); });
    $("#lbNext").addEventListener("click", (e) => { e.stopPropagation(); mostrar(indice + 1); });
    lb.addEventListener("click", (e) => { if (e.target === lb) cerrar(); });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("visible")) return;
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowLeft") mostrar(indice - 1);
      if (e.key === "ArrowRight") mostrar(indice + 1);
    });

    // Mantener el foco dentro del lightbox abierto
    lb.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = $$("a[href], button:not([disabled])", lb)
        .filter((el) => el.getClientRects().length > 0);
      if (!focusables.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    });

    // Deslizar en mobile
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const delta = e.changedTouches[0].clientX - x0;
      if (Math.abs(delta) > 50) mostrar(indice + (delta < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* -------------------------------------------------------------
     5. Carrusel de testimonios
     ------------------------------------------------------------- */
  function initCarrusel() {
    const pista = $("#carruselPista");
    const puntos = $("#carruselPuntos");
    if (!pista || !puntos) return;

    let indice = 0;
    const total = D.TESTIMONIOS.length;
    let timer = null;

    // En desktop se muestran 2 testimonios por vez
    const porPagina = () => (window.innerWidth >= 1024 ? 1 : 1);
    const maxIndice = () => Math.max(0, total - porPagina());

    const renderPuntos = () => {
      const n = maxIndice() + 1;
      puntos.innerHTML = Array.from({ length: n })
        .map((_, i) =>
          `<button class="carrusel__punto${i === indice ? " activo" : ""}" type="button" role="tab"
                   aria-selected="${i === indice}" aria-label="Ir al grupo de testimonios ${i + 1}"></button>`
        )
        .join("");
    };

    const ir = (i) => {
      const max = maxIndice();
      indice = ((i % (max + 1)) + (max + 1)) % (max + 1);
      const desplazamiento = pista.children[indice];
      if (!desplazamiento) return;
      pista.style.transform = `translateX(-${desplazamiento.offsetLeft}px)`;
      $$(".carrusel__punto", puntos).forEach((p, idx) => {
        const activo = idx === indice;
        p.classList.toggle("activo", activo);
        p.setAttribute("aria-selected", String(activo));
      });
    };

    const avanzar = (dir) => ir(indice + dir * porPagina());

    renderPuntos();
    ir(0);

    $("#carruselPrev").addEventListener("click", () => avanzar(-1));
    $("#carruselNext").addEventListener("click", () => avanzar(1));
    puntos.addEventListener("click", (e) => {
      const p = e.target.closest(".carrusel__punto");
      if (p) ir(Number($$(".carrusel__punto", puntos).indexOf(p)));
    });

    // Autoplay
    const iniciar = () => {
      if (reduceMotion) return;
      timer = window.setInterval(() => avanzar(1), 5000);
    };
    const detener = () => { if (timer) { window.clearInterval(timer); timer = null; } };
    const pistaEl = $(".carrusel");
    pistaEl.addEventListener("mouseenter", detener);
    pistaEl.addEventListener("mouseleave", iniciar);
    pistaEl.addEventListener("focusin", detener);
    pistaEl.addEventListener("focusout", iniciar);
    iniciar();

    // Swipe táctil
    let x0 = null;
    pista.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    pista.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const delta = e.changedTouches[0].clientX - x0;
      if (Math.abs(delta) > 50) avanzar(delta < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        indice = Math.min(indice, maxIndice());
        renderPuntos();
        ir(indice);
      }, 180);
    });
  }

  /* -------------------------------------------------------------
     6. Acordeón de preguntas
     ------------------------------------------------------------- */
  function initFaq() {
    const cont = $("#listaFaq");
    if (!cont) return;

    cont.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-item__pregunta");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const respuesta = $(".faq-item__respuesta", item);
      const abierto = item.classList.contains("abierta");

      // Cerrar el resto (acordeón de una sola apertura)
      $$(".faq-item", cont).forEach((otro) => {
        if (otro === item) return;
        otro.classList.remove("abierta");
        $(".faq-item__pregunta", otro).setAttribute("aria-expanded", "false");
        $(".faq-item__respuesta", otro).style.maxHeight = null;
      });

      if (abierto) {
        item.classList.remove("abierta");
        btn.setAttribute("aria-expanded", "false");
        respuesta.style.maxHeight = null;
      } else {
        item.classList.add("abierta");
        btn.setAttribute("aria-expanded", "true");
        respuesta.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });
  }

  /* -------------------------------------------------------------
     7. Contadores animados
     ------------------------------------------------------------- */
  function initContadores() {
    const cont = $("#metricas");
    if (!cont) return;

    const elementos = $$("[data-contador]", cont);
    const animar = (el) => {
      const destino = Number(el.dataset.contador);
      const sufijo = el.dataset.sufijo || "";
      const duracion = 1600;
      const inicio = performance.now();

      const paso = (ahora) => {
        const t = Math.min((ahora - inicio) / duracion, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = formatearPrecio(Math.round(destino * ease)) + sufijo;
        if (t < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };

    if (reduceMotion) {
      elementos.forEach((el) => (el.textContent = el.dataset.contador + (el.dataset.sufijo || "")));
      return;
    }

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          animar(entrada.target);
          obs.unobserve(entrada.target);
        });
      }, { threshold: 0.4 });
      elementos.forEach((el) => obs.observe(el));
    } else {
      elementos.forEach(animar);
    }

    // Red de seguridad: si el observador nunca dispara, mostramos el valor final
    window.setTimeout(() => {
      elementos.forEach((el) => {
        if (el.textContent === "0" || el.textContent === "0" + (el.dataset.sufijo || "")) {
          el.textContent = formatearPrecio(Number(el.dataset.contador)) + (el.dataset.sufijo || "");
        }
      });
    }, 6000);
  }

  /* -------------------------------------------------------------
     8. Formulario, toasts y WhatsApp
     ------------------------------------------------------------- */
  function mostrarToast(titulo, mensaje, tipo) {
    const cont = $("#toastContenedor");
    if (!cont) return;

    const toast = document.createElement("div");
    toast.className = "toast" + (tipo === "error" ? " toast--error" : "");
    toast.innerHTML = `
      <svg aria-hidden="true"><use href="#${tipo === "error" ? "i-alert" : "i-check-circle"}"></use></svg>
      <div><strong>${escapeHTML(titulo)}</strong><span>${escapeHTML(mensaje)}</span></div>`;

    cont.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));

    window.setTimeout(() => {
      toast.classList.remove("visible");
      window.setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  function initFormulario() {
    const form = $("#formulario");
    if (!form) return;

    const campos = [
      { id: "nombre", error: "error-nombre", prueba: (v) => v.trim().length >= 2 },
      { id: "telefono", error: "error-telefono", prueba: (v) => v.replace(/\D/g, "").length >= 8 },
      { id: "email", error: "error-email", prueba: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) },
      { id: "servicio", error: "error-servicio", prueba: (v) => v !== "" }
    ];

    const marcar = (campo, valido) => {
      const input = $("#" + campo.id);
      const error = $("#" + campo.error);
      if (!input || !error) return;
      input.setAttribute("aria-invalid", String(!valido));
      error.classList.toggle("visible", !valido);
    };

    // Validar al salir del campo
    campos.forEach((campo) => {
      const input = $("#" + campo.id);
      if (!input) return;
      input.addEventListener("blur", () => {
        if (input.value.trim() === "") return;
        marcar(campo, campo.prueba(input.value));
      });
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") {
          marcar(campo, campo.prueba(input.value));
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      let primerError = null;

      campos.forEach((campo) => {
        const input = $("#" + campo.id);
        if (!input) return;
        const valido = campo.prueba(input.value);
        marcar(campo, valido);
        if (!valido) {
          ok = false;
          if (!primerError) primerError = input;
        }
      });

      const consent = $("#consentimiento");
      const errConsent = $("#error-consentimiento");
      if (consent && !consent.checked) {
        ok = false;
        consent.setAttribute("aria-invalid", "true");
        if (errConsent) errConsent.classList.add("visible");
        if (!primerError) primerError = consent;
      } else if (consent && errConsent) {
        consent.setAttribute("aria-invalid", "false");
        errConsent.classList.remove("visible");
      }

      if (!ok) {
        mostrarToast("Revisá el formulario", "Faltan datos o hay algo incorrecto. Marcamos los campos a completar.", "error");
        if (primerError) {
          primerError.focus();
          primerError.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        }
        return;
      }

      const boton = $("#btnEnviar");
      const textoOriginal = boton.innerHTML;
      boton.disabled = true;
      boton.innerHTML = "Enviando…";

      const datos = Object.fromEntries(new FormData(form).entries());
      datos._subject = "Nueva consulta desde el sitio de F6 Climatización";
      datos._template = "table";
      datos._captcha = "false";
      datos._replyto = datos.email || D.CONFIG.email;

      fetch(D.CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(datos),
      })
        .then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(() => {
          form.reset();
          $$("[aria-invalid]", form).forEach((el) => el.setAttribute("aria-invalid", "false"));
          $$(".campo__error", form).forEach((el) => el.classList.remove("visible"));
          mostrarToast("¡Consulta enviada!", "Gracias por escribirnos. Te respondemos dentro de las próximas 24 horas.");
        })
        .catch(() => {
          mostrarToast("No pudimos enviar la consulta", "Probá de nuevo en un momento o escribinos por WhatsApp.", "error");
        })
        .finally(() => {
          boton.disabled = false;
          boton.innerHTML = textoOriginal;
        });
    });

    // Enviar por WhatsApp en lugar del formulario
    const btnWa = $("#btnWhatsappForm");
    if (btnWa) {
      btnWa.addEventListener("click", () => {
        const nombre = $("#nombre").value.trim();
        const telefono = $("#telefono").value.trim();
        const servicio = $("#servicio").value;
        const mensaje = $("#mensaje").value.trim();

        if (!nombre || !telefono) {
          mostrarToast("Faltan datos", "Completá al menos tu nombre y tu teléfono para enviar la consulta por WhatsApp.", "error");
          const campo = !nombre ? $("#nombre") : $("#telefono");
          if (campo) { campo.focus(); campo.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); }
          return;
        }

        const texto =
          `Hola F6 Climatización, soy ${nombre}.\n` +
          `Teléfono: ${telefono}\n` +
          (servicio ? `Necesito: ${servicio}\n` : "") +
          (mensaje ? `Detalle: ${mensaje}` : "Quedo a la espera, gracias.");

        window.open(D.waLink(texto), "_blank", "noopener");
      });
    }

    // Enlaces legales: evitan la navegación pero avisan
    ["#linkPrivacidad", "#linkTerminos", "#linkPrivacidad2"].forEach((sel) => {
      const el = $(sel);
      if (!el) return;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarToast(
          "Próximamente",
          "Este documento legal todavía no está publicado. Escribinos y te lo enviamos por mail."
        );
      });
    });
  }

  /* -------------------------------------------------------------
      9. Scroll: progreso, header, enlace activo y animaciones
     ------------------------------------------------------------- */
  function initScroll() {
    const header = $("#header");
    const progreso = $("#barraProgreso");
    const navLinks = $$("#navLinks .nav__enlace");
    const secciones = navLinks
      .map((a) => ({ link: a, seccion: document.querySelector(a.getAttribute("href")) }))
      .filter((s) => s.seccion);

    // Alto real del header -> compensate el padding del body
    const medirHeader = () => {
      if (!header) return;
      const alto = header.offsetHeight;
      document.documentElement.style.setProperty("--alto-nav", alto + "px");
    };
    medirHeader();
    window.addEventListener("resize", medirHeader);
    window.addEventListener("orientationchange", () => window.setTimeout(medirHeader, 250));

    let ticking = false;
    const alHacerScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;

      if (header) header.classList.toggle("scrolled", y > 20);

      if (progreso) {
        const alto = document.documentElement.scrollHeight - window.innerHeight;
        progreso.style.width = (alto > 0 ? (y / alto) * 100 : 0) + "%";
      }

      // Enlace activo
      let actual = null;
      secciones.forEach(({ link, seccion }) => {
        if (seccion.getBoundingClientRect().top <= 140) actual = link;
      });
      navLinks.forEach((l) => l.classList.remove("activo"));
      if (actual) actual.classList.add("activo");

      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(alHacerScroll);
    }, { passive: true });
    alHacerScroll();
  }

  function initRevelar() {
    const elementos = $$(".revelar");
    if (!elementos.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("visible"));
      return;
    }

    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada, i) => {
        if (!entrada.isIntersecting) return;
        setTimeout(() => entrada.target.classList.add("visible"), i * 70);
        obs.unobserve(entrada.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    elementos.forEach((el) => obs.observe(el));
  }

  /* -------------------------------------------------------------
     Inicialización
     ------------------------------------------------------------- */
  function init() {
    // Datos del negocio inyectados desde datos.js
    const tel = D.CONFIG.telefonoLink;
    $$("[href^='tel:']").forEach((a) => (a.href = tel));
    $$("a[href*='wa.me']").forEach((a) => {
      // No pisar los enlaces que ya traen mensaje pre-cargado
      if (a.getAttribute("href").includes("?")) return;
      a.href = `https://wa.me/${D.CONFIG.whatsapp}`;
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$(".info-tarjeta a[href^='mailto:']").forEach((a) => (a.href = "mailto:" + D.CONFIG.email));
    $$("[data-red]").forEach((a) => {
      const url = D.CONFIG[a.dataset.red];
      if (url && url !== "#") { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    });
    const iframe = $(".mapa iframe");
    if (iframe && D.CONFIG.mapa) iframe.src = D.CONFIG.mapa;
    const anio = $("#anioActual");
    if (anio) anio.textContent = new Date().getFullYear();

    renderServicios();
    renderGaleria();
    renderTestimonios();
    renderFaq();
    renderArticulos();

    initMenuMovil();
    initLightbox();
    initCarrusel();
    initFaq();
    initContadores();
    initFormulario();
    initScroll();
    initRevelar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
