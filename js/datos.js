/* =====================================================================
   F6 Refrigeración — Datos del sitio
   ---------------------------------------------------------------------
   Editá este archivo para cambiar el contenido de la página:
   servicios, galería, testimonios, preguntas y artículos.
   Los placeholders marcados como "EDITAR" son los que tenés que
   reemplazar con los datos reales de tu negocio.
   ===================================================================== */

/* ---------------------------------------------------------------
   1. Configuración general (EDITAR)
   --------------------------------------------------------------- */
const CONFIG = {
  empresa: "F6 Refrigeración",
  telefono: "+54 9 11 2499-6663",          
  telefonoLink: "tel:+541124996663",       
  whatsapp: "541124996663",                
  email: "f6climatizacion@gmail.com",    
  direccion: "Bahia Blanca 622, torre 3 piso 1 depto 3",   
  ciudad: "Wilde, Avellaneda, Buenos Aires",            
  mapa: "https://www.openstreetmap.org/export/embed.html?bbox=-58.31585%2C-34.69703%2C-58.31173%2C-34.69553&layer=mapnik&marker=-34.6963204%2C-58.3135121",
  instagram: "https://www.instagram.com/f6climatizacion/",
  facebook: "https://www.facebook.com/profile.php?id=61574328155013",
  formEndpoint: "https://formsubmit.co/ajax/f6climatizacion@gmail.com",
};

/* Enlace de WhatsApp con mensaje pre-cargado */
const waLink = (texto) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

/* ---------------------------------------------------------------
   2. Servicios
   --------------------------------------------------------------- */
const SERVICIOS = [
  {
    icono: "i-tools",
    titulo: "Instalación y puesta en marcha",
    texto: "Colocamos tu equipo, lo conectamos a la red eléctrica y al desagüe, y verificamos que todo funcione en óptimas condiciones.",
    lista: ["Transporte y subida a planta", "Conexión eléctrica y a desagüe", "Nivelado y sellado de puertas", "Prueba de arranque y garantía"],
    enlace: "Consultar instalación"
  },
  {
    icono: "i-wrench",
    titulo: "Service y reparación",
    texto: "Diagnóstico en el sitio y reparación con repuestos originales de las marcas más habituales del mercado.",
    lista: ["Cambio de compresor y relés", "Reparación de placa electrónica", "Garantía de 6 meses por intervención"],
    enlace: "Pedir un técnico"
  },
  {
    icono: "i-thermo",
    titulo: "Recarga de gas y refrigerantes",
    texto: "Trabajamos con los refrigerantes reglamentarios (R-410A, R-32, R-600a) y verificamos la pérdida antes de recargar.",
    lista: ["Detección de fugas con detector", "Vacío y carga por peso", "Limpieza de circuito", "Informe de presión final"],
    enlace: "Cotizar recarga"
  },
  {
    icono: "i-shield",
    titulo: "Mantenimiento preventivo",
    texto: "Plan anual para equipos que se usan en el hogar, el comercio o la industria.",
    lista: ["Limpieza de condensadores", "Ajuste de temperaturas", "Revisión de sellos y bisagras", "Informe técnico por escrito"],
    enlace: "Armar mi plan"
  },
  {
    icono: "i-leaf",
    titulo: "Limpieza profunda y ahorro",
    texto: "Dejamos tu equipo como nuevo y te explicamos cómo consumir menos energía sin perder frío.",
    lista: ["Desengrase y sanitización", "Limpieza de serpentines", "Optimización de consumo", "Asesoramiento de uso"],
    enlace: "Reservar limpieza"
  },
  {
    icono: "i-cube",
    titulo: "Equipamiento comercial",
    texto: "Proyectos completos para bares, restaurantes, hoteles, farmacias y cámaras frigoríficas.",
    lista: ["Proyecto y cálculo térmico", "Suministro e instalación", "Capacitación al personal", "Contratos de mantenimiento"],
    enlace: "Hablar con un asesor"
  }
];

/* ---------------------------------------------------------------
   3. Galería de trabajos
   --------------------------------------------------------------- */
const GALERIA = [
  {
    titulo: "Instalación de heladera",
    lugar: "Cocina · Zona Sur",
    img: "./f6 imagenes/heladera 0.jpg"
  },
  {
    titulo: "Mantenimiento preventivo",
    lugar: "Heladera familiar",
    img: "photo-1581094794329-c8112a89af12"
  },
  {
    titulo: "Recarga de refrigerante",
    lugar: "Split 4500 frigorías",
    img: "./f6 imagenes/gases-refrigerantes.jpg"
  },
  {
    titulo: "Cámara frigorífica",
    lugar: "Local comercial",
    img: "./f6 imagenes/camara-frigorifica.jpg"
  },
  {
    titulo: "Equipo técnico en sitio",
    lugar: "Service a domicilio",
    img: "photo-1581092160562-40aa08e78837"
  },
  {
    titulo: "Aire acondicionado central",
    lugar: "Vivienda unifamiliar",
    img: "./f6 imagenes/como-funciona-el-aire-acondicionado.jpg"
  },
  {
    titulo: "Freezer en depósito",
    lugar: "Almacén de alimentos",
    img: "./f6 imagenes/frezzer.jpg"
  },
  {
    titulo: "Vitrina en tienda",
    lugar: "Comercio de barrio",
    img: "photo-1600489000022-c2086d79f9d4"
  }
];

/* ---------------------------------------------------------------
   4. Testimonios
   --------------------------------------------------------------- */
const TESTIMONIOS = [
  {
    texto: "Me preguntaron todo por WhatsApp y al día siguiente el técnico estaba en casa. La heladera volvió a enfriar como el primer día, y me convocaron por las dudas de la garantía.",
    nombre: "Mariana López",
    lugar: "Vicente López",
    foto: "photo-1494790108377-be9c29b29330",
    estrellas: 5
  },
  {
    texto: "Tenemos un bar y los freezers son la vida del negocio. Atienden urgencias un domingo y nunca nos dejaron sin servicio. Altamente recomendados para el comercio.",
    nombre: "Javier Souto",
    lugar: "Palermo",
    foto: "photo-1507003211169-0a1dd7228f2d",
    estrellas: 5
  },
  {
    texto: "Instalaron tres aires en la oficina y el espacio quedó fresco todo el verano. Muy ordenado el trabajo: dejaron todo limpio y nos explicaron cada punto del presupuesto.",
    nombre: "Silvia Romano",
    lugar: "Belgrano",
    foto: "photo-1438761681033-6461ffad8d80",
    estrellas: 5
  },
  {
    texto: "Me diagnosticaron por teléfono sin cobrar nada y me confirmaron que el problema era el termostato. Cambiaron la pieza y quedó como nuevo.",
    nombre: "Rodrigo Ferreyra",
    lugar: "San Isidro",
    foto: "photo-1500648767791-00dcc994a43e",
    estrellas: 4
  },
  {
    texto: "Armamos el contrato de mantenimiento para la cámara del depósito. Responden, avisan con tiempo y la documentación impecable.",
    nombre: "Andrea Molina",
    lugar: "Villa Crespo",
    foto: "photo-1560250097-0b93528c311a",
    estrellas: 5
  }
];

/* ---------------------------------------------------------------
   5. Preguntas frecuentes
   --------------------------------------------------------------- */
const FAQ = [
  {
    p: "¿Cada cuánto conviene hacer el mantenimiento de una heladera?",
    r: "Recomendamos una revisión anual y una limpieza de condensadores cada 6 meses. En equipos comerciales o de uso intensivo el intervalo se acorta a 3 o 4 meses."
  },
  {
    p: "¿Cuál es la diferencia entre el mantenimiento preventivo y una reparación?",
    r: "El mantenimiento es planificado: limpiamos, ajustamos temperaturas y revisamos piezas que todavía funcionan. La reparación es correctiva, se hace cuando el equipo ya falló. El preventivo siempre sale más barato."
  },
  {
    p: "¿Cuánto tarda una instalación?",
    r: "Una instalación estándar de heladera o aire split toma entre 1 y 2 horas. Si hay que hacer recorrido de cañerías, obra o conexión a desagüe puede extenderse. Te lo confirmamos antes de empezar."
  },
  {
    p: "¿Trabajás con equipos de otras marcas?",
    r: "Sí. Atendemos las marcas más comunes del mercado (Samsung, LG, Whirlpool, Electrolux, Bosch, Indesit, Daewoo, Hisense) tanto en línea blanca como en equipos comerciales."
  },
  {
    p: "¿Qué garantía manejan en las intervenciones?",
    r: "Todas nuestras reparaciones tienen 6 meses de garantía sobre mano de obra y repuestos. Las instalaciones incluyen garantía de los equipos según el plazo del fabricante (de 1 a 3 años)."
  },
  {
    p: "¿Cuánto cuesta la recarga de gas?",
    r: "El precio depende del equipo y del refrigerante. Antes de recargar siempre detectamos fugas: si hay una pérdida, recargar sin corregirla sería tirar el gas. El diagnóstico es sin cargo."
  },
  {
    p: "¿Cada cuánto hay que limpiar el filtro del aire acondicionado?",
    r: "Cada 2 o 3 semanas en temporada de uso intenso, y al menos una vez por mes en temporada baja. Un filtro tapado baja el rendimiento, aumenta el consumo y fuerza el compresor."
  },
  {
    p: "¿Atienden urgencias los fines de semana?",
    r: "Sí. Contamos con guardias los sábados de 9 a 14 h y los domingos por la mañana. También podés concertar la visita el día y horario que te quede cómodo."
  }
];

/* ---------------------------------------------------------------
   6. Artículos del blog
   --------------------------------------------------------------- */
const ARTICULOS = [
  {
    titulo: "Cómo limpiar el condensador de tu aire acondicionado",
    categoria: "Mantenimiento",
    fecha: "12 de marzo",
    extracto: "El filtro es lo que todos limpian, pero el condensador es el que más rendimiento te da. Te mostramos el paso a paso sin herramientas especiales.",
    img: "./f6 imagenes/blog img/aireAconBlog.jpg"
  },
  {
    titulo: "Heladera No Frost: 7 errores que arruinan tu equipo",
    categoria: "Heladeras",
    fecha: "28 de febrero",
    extracto: "Apilar el freezer, congelar el evaporador y dejar la puerta abierta mucho tiempo. Los errores más comunes que acortan la vida útil del equipo.",
    img: "./f6 imagenes/blog img/heladeraBlog.jpg"
  },
  {
    titulo: "Cuánto gasta un freezer por mes (y cómo bajarlo)",
    categoria: "Ahorro",
    fecha: "15 de febrero",
    extracto: "Un freezer bien usado consume alrededor de 1 kWh por día. Te mostramos cuánto es en pesos y los tres ajustes que más impactan en la factura.",
    img: "./f6 imagenes/blog img/frezzer1.jpg"
  },
  {
    titulo: "R-410A vs R-32: por qué importa el refrigerante",
    categoria: "Técnico",
    fecha: "30 de enero",
    extracto: "No todos los gases son iguales. Comparamos seguridad, rendimiento y huella ambiental para que sepas qué tiene tu equipo instalado.",
    img: "photo-1571175443880-49e1d25b2bc5"
  },
  {
    titulo: "Freezer horizontal o vertical: cuál te conviene",
    categoria: "Equipamiento",
    fecha: "18 de enero",
    extracto: "El uso real del espacio, la frecuencia de apertura y el volumen disponible deciden. Te damos una tabla simple para elegir sin dudas.",
    img: "./f6 imagenes/blog img/frezzer vertical.jpg"
  },
  {
    titulo: "Checklist de mantenimiento para tu cámara frigorífica",
    categoria: "Comercial",
    fecha: "9 de enero",
    extracto: "Una lista de 6 puntos para revisar cada semana y no perder mercadería por una falla de temperatura.",
    img: "./f6 imagenes/blog img/camara-refrigeracion.jpg"
  }
];

/* ---------------------------------------------------------------
   7. Ilustraciones SVG de los equipos (reservadas)
   ---------------------------------------------------------------------
   Set de ilustraciones vectoriales de heladeras, freezers, aires y
   exhibidores. No se usan en la página actual: quedan guardadas por
   si más adelante querés sumar un catálogo de productos (se pintan
   sobre la foto del equipo y siempre se ven nítidas).
   --------------------------------------------------------------- */
const ICONOS = {
  heladera: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="34" y="8" width="52" height="102" rx="7" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <path d="M34 44h52" stroke="#0b3b60" stroke-width="2.6"/>
      <rect x="77" y="17" width="4.5" height="17" rx="2.2" fill="#22b8e6"/>
      <rect x="77" y="52" width="4.5" height="21" rx="2.2" fill="#22b8e6"/>
      <rect x="42" y="19" width="22" height="4" rx="2" fill="#cbd5e1"/>
      <rect x="42" y="49" width="30" height="3.5" rx="1.75" fill="#cbd5e1"/>
      <rect x="42" y="57" width="20" height="3.5" rx="1.75" fill="#cbd5e1"/>
      <rect x="41" y="84" width="16" height="13" rx="2.5" fill="#e0f2fe" stroke="#22b8e6" stroke-width="1.8"/>
      <path d="M46 89h6M46 93h4" stroke="#22b8e6" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M26 20v80M94 20v80" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".55"/>
      <path d="M20 28h4M20 48h4M20 68h4M96 28h4M96 48h4M96 68h4" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".45"/>
    </svg>`,

  undercounter: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="22" y="44" width="76" height="54" rx="7" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <path d="M22 72h76" stroke="#0b3b60" stroke-width="2.4"/>
      <rect x="87" y="52" width="4.5" height="13" rx="2.2" fill="#22b8e6"/>
      <rect x="87" y="79" width="4.5" height="13" rx="2.2" fill="#22b8e6"/>
      <rect x="31" y="53" width="26" height="4" rx="2" fill="#cbd5e1"/>
      <rect x="31" y="80" width="18" height="3.5" rx="1.75" fill="#cbd5e1"/>
      <path d="M14 100h92" stroke="#0b3b60" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M30 32v8M40 28v12M50 32v8" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    </svg>`,

  freezer: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="12" y="42" width="96" height="46" rx="8" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <rect x="21" y="50" width="78" height="17" rx="4" fill="#e0f2fe" stroke="#22b8e6" stroke-width="1.9"/>
      <rect x="29" y="74" width="26" height="6" rx="3" fill="#cbd5e1"/>
      <circle cx="80" cy="77" r="8" fill="#e0f2fe" stroke="#0b3b60" stroke-width="1.9"/>
      <path d="M76 77h8M80 73v8" stroke="#22b8e6" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M12 88h96" stroke="#0b3b60" stroke-width="2.6"/>
      <path d="M22 32v8M33 28v12M44 32v8" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".65"/>
      <path d="M60 30v10M71 30v10" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".4"/>
    </svg>`,

  split: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="18" y="28" width="84" height="34" rx="10" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <path d="M30 54h60" stroke="#22b8e6" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M38 38h34" stroke="#cbd5e1" stroke-width="4.2" stroke-linecap="round"/>
      <circle cx="86" cy="39" r="4.5" fill="#e0f2fe" stroke="#0b3b60" stroke-width="1.7"/>
      <path d="M46 66c0 7-9 7-9 14s9 7 9 14" fill="none" stroke="#22b8e6" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>
      <path d="M62 66c0 7 9 7 9 14s-9 7-9 14" fill="none" stroke="#22b8e6" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
      <path d="M78 66c0 7 9 7 9 14" fill="none" stroke="#22b8e6" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>
    </svg>`,

  fancoil: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="10" y="32" width="100" height="42" rx="7" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <circle cx="38" cy="53" r="14" fill="#e0f2fe" stroke="#0b3b60" stroke-width="2"/>
      <path d="M38 43c0 7 5 10 10 10-6 4-10 0-10-7" fill="none" stroke="#22b8e6" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M38 63c0-7-5-10-10-10 6-4 10 0 10 7" fill="none" stroke="#22b8e6" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M66 44v18M76 42v22M86 44v18M96 46v14" stroke="#22b8e6" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M10 74h100" stroke="#0b3b60" stroke-width="2.6"/>
      <path d="M28 84v8M44 82v10M60 84v8" stroke="#22b8e6" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    </svg>`,

  vitrina: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="20" y="16" width="80" height="86" rx="7" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <rect x="28" y="25" width="64" height="56" rx="4" fill="#e0f2fe" stroke="#22b8e6" stroke-width="1.9"/>
      <path d="M28 43h64M28 62h64" stroke="#22b8e6" stroke-width="1.5" opacity=".55"/>
      <rect x="33" y="31" width="11" height="10" rx="2" fill="#fbbf24"/>
      <rect x="49" y="31" width="11" height="10" rx="2" fill="#f87171"/>
      <rect x="65" y="31" width="11" height="10" rx="2" fill="#4ade80"/>
      <rect x="41" y="50" width="13" height="9" rx="2" fill="#60a5fa"/>
      <rect x="59" y="50" width="13" height="9" rx="2" fill="#fb923c"/>
      <rect x="30" y="88" width="60" height="7" rx="3" fill="#cbd5e1"/>
      <path d="M14 104h92" stroke="#0b3b60" stroke-width="3.2" stroke-linecap="round"/>
    </svg>`,

  camara: `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <rect x="14" y="22" width="92" height="76" rx="6" fill="#ffffff" stroke="#0b3b60" stroke-width="2.6"/>
      <rect x="24" y="32" width="72" height="46" rx="3" fill="#e0f2fe" stroke="#22b8e6" stroke-width="1.9"/>
      <path d="M48 32v46M72 32v46" stroke="#22b8e6" stroke-width="1.5" opacity=".6"/>
      <rect x="52" y="48" width="16" height="12" rx="2" fill="#ffffff" stroke="#0b3b60" stroke-width="1.7"/>
      <rect x="28" y="86" width="64" height="7" rx="3" fill="#cbd5e1"/>
      <path d="M14 98h92" stroke="#0b3b60" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M60 8v10M52 11l8 8 8-8" stroke="#22b8e6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`
};

/* ---------------------------------------------------------------
   8. Exportación
   --------------------------------------------------------------- */
window.DATOS = {
  CONFIG, SERVICIOS, GALERIA, TESTIMONIOS, FAQ, ARTICULOS, ICONOS, waLink
};
