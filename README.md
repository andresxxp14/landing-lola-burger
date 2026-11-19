# 🍔 Lola Street Food — Landing Page

Landing page moderna, atractiva y responsiva para el negocio local de comida rápida **Lola Street Food**, desarrollada con HTML5, CSS3 puro y JavaScript moderno.

## 📁 Estructura de archivos

```
lola-street-food/
├── index.html              ← Página principal (Navbar, Hero, Menú con filtros, Equipo, Formulario y Footer)
├── css/
│   ├── styles.css          ← Estilos globales, variables, layout, formulario y filtros
│   ├── animations.css      ← Efectos de scroll (IntersectionObserver), shimmer y animaciones
│   └── responsive.css      ← Breakpoints y optimizaciones multidispositivo
├── js/
│   └── main.js             ← Filtro dinámico de productos, validación de formulario y generador WhatsApp
└── img/
    ├── hero.jpg            ← (opcional) Imagen principal del Hero
    └── team/
        ├── miembro1.jpg    ← (opcional) Fotos del equipo de desarrollo
        ├── miembro2.jpg
        ├── miembro3.jpg
        └── miembro4.jpg
```

## ✅ Secciones y Características

| # | Sección / Módulo | Funcionalidades |
|---|-------------------|-----------------|
| 1 | **Navbar** | Fija con efecto de desenfoque al scrollear, indicador de sección activa y menú toggle responsivo para móviles. |
| 2 | **Hero Principal** | Degradados modernos, badges flotantes, llamado a la acción y contadores estadísticos animados. |
| 3 | **Menú y Filtro Rápido** | **Nuevo:** Filtro por categorías (*Todos*, *Hamburguesas*, *Acompañantes*, *Veggie*) con animaciones fluidas, tarjetas detalladas, precios en bolívares y botón rápido de adición con notificación toast. |
| 4 | **Equipo de Desarrollo** | Espacio dedicado para fotos circulares, roles técnicos, biografías de los integrantes y enlaces a redes sociales (GitHub, LinkedIn, Instagram). |
| 5 | **Contacto & Formulario** | **Nuevo:** Formulario interactivo con validación de campos en tiempo real (nombre, teléfono, selección de producto y mensaje). Genera y abre un enlace directo hacia **WhatsApp** con el pedido redactado. |
| 6 | **Footer** | Horarios de atención con badge de estado, ubicación física, números de teléfono, correos y copyright con año automático. |

## ⚙️ Personalización rápida

### 1. Número de WhatsApp
En `js/main.js`, busca la variable `whatsappPhone`:
```js
const whatsappPhone = '584165550000'; // ← Reemplaza con el código de país y número real sin símbolos (+, -)
```

### 2. Filtro de Productos y Categorías
Para añadir más categorías o productos, agrega el atributo `data-category="nombre-categoria"` a las tarjetas `<article class="menu-card">` y su botón correspondiente con `data-filter="nombre-categoria"`.

### 3. Fotos y Datos del Equipo
En `index.html` (sección `#equipo`), puedes sustituir los placeholders por imágenes:
```html
<img src="img/team/tu-foto.jpg" alt="Nombre del integrante" />
```
Y actualizar los nombres, roles y biografías de los integrantes.

## 🚀 Cómo visualizar el proyecto

No necesitas instalar Node.js ni configurar servidores locales:
1. Haz doble clic en `index.html` o ábrelo con tu navegador preferido (Chrome, Edge, Firefox, Safari).
2. Es 100% responsivo para teléfonos inteligentes, tablets y computadoras de escritorio.

---
*UNERMB · Proyecto de Electiva · 2026*
