# F6 Refrigeración — Landing page

Sitio web de una sola página para un negocio de refrigeración y climatización
(venta, instalación y mantenimiento de heladeras, freezers, aires acondicionados
y equipamiento comercial).

**Tecnología:** HTML5 + CSS3 + JavaScript (vanilla). Sin frameworks, sin
dependencias, sin build. Se abre con doble clic en `index.html`.

---

## Estructura

```
F6 Refrigeracion/
├── index.html          # Estructura de la página
├── css/
│   └── estilos.css     # Todos los estilos (mobile-first)
├── js/
│   ├── datos.js        # CONTENIDO: servicios, galería, textos, contacto
│   └── main.js         # LÓGICA: menú, lightbox, carrusel, contadores, form
└── LEEME.md            # Este archivo
```

Regla de oro: **el contenido se cambia en `js/datos.js`**, la apariencia en
`css/estilos.css`. No hace falta tocar el HTML para actualizar los textos,
las fotos de la galería o los datos de contacto.

---

## 1. Datos del negocio

Abrí `js/datos.js` y editá el bloque `CONFIG` (todo lo que dice `EDITAR`):

```js
const CONFIG = {
  telefono: "+54 9 11 0000-0000",        // se muestra en toda la página
  telefonoLink: "tel:+541100000000",     // usado por los botones "Llamar"
  whatsapp: "541100000000",              // solo números, con el 54
  email: "info@f6refrigeracion.com.ar",
  direccion: "Av. Nombre 1234, Local 5",
  ciudad: "Ciudad, Provincia",
  mapa: "https://www.openstreetmap.org/export/embed.html?bbox=...",
  instagram: "https://www.instagram.com/f6climatizacion/",
  facebook: "https://www.facebook.com/profile.php?id=61574328155013"
};
```

El teléfono, el WhatsApp y el mapa se inyectan automáticamente en todos los
lugares de la página (navbar, panel móvil, tarjetas de contacto, footer). No
hace falta buscarlos en el HTML.

---

## 2. Set de ilustraciones de los equipos (reservado)

En `js/datos.js` está el objeto `ICONOS` con **7 ilustraciones vectoriales**
de heladeras, freezers, aires y exhibidores:

```js
ICONOS = {
  heladera, undercounter, freezer, split,
  fancoil, vitrina, camara
}
```

La página actual **no las usa** (se guardan como material de reserva).
Sirven para armar tarjetas de producto que combinen una foto de Unsplash
desenfocada con la ilustración SVG del equipo encima: el dibujo siempre se ve
nítido, sin importar el tamaño de la pantalla.

Si más adelante querés sumar un catálogo:

1. Agregá un array `PRODUCTOS` en `js/datos.js` con los datos de cada equipo
   (`id`, `nombre`, `desc`, `precio`, `icono`, `specs`).
2. Agregá el bloque `<section id="catalogo">` en `index.html` y el link
   `#catalogo` en el navbar, el panel móvil y el footer.
3. En `js/main.js` copiá el patrón de `renderGaleria()` para pintar las
   tarjetas, y usá `D.ICONOS[p.icono]` para la ilustración.
4. Para usar fotos reales de tu stock en vez de Unsplash, ajustá la función
   `imgUnsplash` para que devuelva la ruta local cuando no sea un ID de
   Unsplash:

```js
const imgUnsplash = (id, ancho, alto) =>
  id.startsWith("photo-")
    ? `https://images.unsplash.com/${id}?w=${ancho}&q=70&auto=format&fit=crop&fm=jpg`
    : id;
```

---

## 3. Servicios, testimonios, FAQ y blog

Todo está en `js/datos.js`:

| Array         | Qué controla                                    |
|---------------|-------------------------------------------------|
| `SERVICIOS`   | Las 6 tarjetas de la sección "Servicios"        |
| `GALERIA`     | Las 8 imágenes de "Trabajos" (van al lightbox)  |
| `TESTIMONIOS` | El carrusel de reseñas                          |
| `FAQ`         | El acordeón de preguntas frecuentes             |
| `ARTICULOS`   | Las 6 notas del blog                            |

---

## 4. Colores y tipografía

Todo está al principio de `css/estilos.css`, en el bloque `:root`:

```css
:root {
  --azul-700: #0e4d7a;    /* azul institucional */
  --cian: #22b8e6;        /* acento frío */
  --naranja: #ff7a18;     /* acento sobre fondos oscuros y detalles */
  --naranja-btn: #c25100; /* fondo de botones con texto blanco (contraste AA) */
  --naranja-oscuro: #a34200; /* texto naranja sobre fondo claro */
  --verde: #15a36d;       /* confirmaciones */
  --gris-100: #f1f5f9;    /* fondos suaves */
  ...
}
```

> **Sobre el naranja:** `--naranja` es el naranja de marca, pero con texto blanco
> encima queda en 2.6:1 y no cumple el mínimo AA (4.5:1). Por eso los botones usan
> `--naranja-btn` (#c25100 → 4.7:1) y los textos naranjas sobre fondo claro usan
> `--naranja-oscuro` (#a34200 → 6.3:1). Si cambiás el color de marca, mantené esa
> separación o corré el contraste con un verificador (axe, Lighthouse o WebAIM).

Cambiar esos valores repinta toda la página.

---

## 5. Responsive

El sitio está hecho **mobile-first**: los estilos base están pensados para un
celular de 360 px y se van ampliando con los *breakpoints*:

| Breakpoint  | Cambios principales                                  |
|-------------|------------------------------------------------------|
| 360 px      | 1 columna en todo, menú hamburguesa lateral          |
| 480 px      | Blog y formulario a 2 columnas                       |
| 640 px      | Métricas a 4 columnas, servicios a 2                 |
| 768 px      | Contacto en 2 columnas, galería a 3                 |
| 1024 px     | Menú de escritorio, servicios y blog a 3, galería a 4 |

En celular no hay elementos flotantes que tapen el contenido: el único
elemento fijo es el navbar superior. El menú lateral tiene 320 px de ancho
máximo y se puede cerrar tocando afuera o con la tecla `Esc`.

---

## 6. Formulario

El envío se hace por AJAX a [FormSubmit](https://formsubmit.co) y las consultas
llegan a `f6climatizacion@gmail.com`. El endpoint se configura en
`js/datos.js` (`CONFIG.formEndpoint`).

**Importante — activación:** el primer envío desde el sitio publicado dispara
un correo de confirmación ("Confirm your email") a esa casilla. Hay que abrir
ese mail y confirmar el formulario; hasta entonces las consultas no se
entregan.

Cómo está armado:

- El `fetch` vive en `initFormulario()` de `js/main.js`.
- `_template: "table"` → el mail llega como tabla campo/valor.
- `_replyto` → al responder el mail le contestás directo al cliente.
- `_honey` → campo oculto en el HTML; FormSubmit descarta los envíos que lo
  traigan completo (anti-spam).
- Si la petición falla, aparece un toast de error y se invita a usar WhatsApp.
- Para cambiar el destinatario, editá `CONFIG.formEndpoint` en `js/datos.js`.

El botón "Prefiero WhatsApp" funciona sin backend: arma el mensaje con los
datos que completó el visitante y abre el chat.

Si preferís no exponer el Gmail en el código, la alternativa es Web3Forms
(access key gratuita, 250 envíos por mes).

---

## 7. Imágenes de Unsplash

Las fotos vienen de `images.unsplash.com` con parámetros de optimización
(`w=800&q=70&auto=format&fit=crop`). Requieren conexión a internet.

Si necesitás que la página funcione **sin internet**, descargá las imágenes
a una carpeta `img/` local y reemplazá las URLs por las rutas locales
(mismo criterio que en el punto 2).

---

## 8. Accesibilidad y SEO

- HTML semántico (`header`, `nav`, `main`, `section`, `footer`, `article`).
- Enlace de salto al contenido, `aria-label` en los controles, `aria-expanded`
  en menú y acordeón, `aria-live` en los avisos.
- Los íconos son SVG con `aria-hidden`; los botones de solo ícono tienen
  `aria-label`.
- `prefers-reduced-motion` desactiva las animaciones.
- Meta description, Open Graph y `theme-color` configurados.
- **Menú lateral y lightbox**: el panel cerrado queda con `visibility: hidden` +
  `inert` + `aria-hidden="true"`, así sus enlaces no se pueden tabular ni leer.
  Al abrirlos, el foco entra al panel y queda atrapado dentro (Tab cicla);
  al cerrarlos, el foco vuelve al control que los abrió.
- **Objetivos táctiles**: todos los enlaces y botones interactivos miden al
  menos 24 × 24 px (mínimo de WCAG 2.2) y la mayoría 32 px o más.
- **Contraste**: verificado sobre los píxeles renderizados (no sólo sobre el CSS):
  título del hero 11.4:1, rótulos de la galería 6.5:1, botones naranjas 4.7:1.
- **En pantallas táctiles** los rótulos de la galería se muestran siempre
  (sólo se ocultan hasta el *hover* en pantallas de 768 px o más con mouse).

Para cambiar el SEO, editá las etiquetas `<meta>` del `<head>` de `index.html`.

---

## 9. Publicar el sitio

Como es HTML estático, sirve con cualquier hosting:

- **Netlify / Vercel / Cloudflare Pages:** arrastrá la carpeta. No hay build.
- **Hosting tradicional:** subí los archivos por FTP a `public_html`.
- **Google Sites, Netlify Drop, GitHub Pages:** también funcionan tal cual.

Si agregás un backend o precompilás algo, ajustá las rutas de `css/` y `js/`.
