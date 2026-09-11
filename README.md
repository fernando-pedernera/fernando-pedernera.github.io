# Registro de Actualizaciones del Portfolio

Este documento sirve como bitácora para repasar y entender todas las mejoras técnicas, de analítica y de SEO que se han implementado en el portfolio.

## 1. Corrección de Navegación
- **Problema:** El botón "Sobre Mí" apuntaba a una sección `#about` que no existía.
- **Solución:** Se actualizó el enlace en `index.html` para que apunte a `#hero`.
- **Por qué se hizo:** Para asegurar que la experiencia de usuario (UX) sea fluida y la página posicione la vista correctamente en la biografía.

## 2. Integración de Google Analytics (GA4)
- **Archivos modificados:** `index.html`, `script.js`
- **Qué se hizo:**
  - Se insertó el script global de Google Analytics en el `<head>` usando el ID de medición provisto (`G-XKD2H4L1LE`).
  - Se desarrolló una función auxiliar `trackEvent` en `script.js` para enviar eventos personalizados a GA4.
- **Métricas personalizadas configuradas:**
  - `download_cv`: Rastrea descargas del CV diferenciando el idioma (EN/ES).
  - `click_github_project`: Rastrea clics hacia repositorios, capturando el nombre del proyecto.
  - `view_powerbi_dashboard`: Rastrea clics hacia dashboards interactivos.
  - `click_contact`: Mide la interacción con LinkedIn y el correo electrónico.
  - `toggle_language`: Mide la preferencia de idioma de los visitantes.
- **Por qué se hizo:** Para tener datos precisos sobre qué secciones y proyectos generan más interés (ideal para perfiles de Data/AI Engineer).

## 3. Optimización Gráfica (Logo Microsoft Learn)
- **Archivos creados/modificados:** `img/microsoft-learn.svg`, `index.html`
- **Qué se hizo:**
  - Se creó un logo en formato SVG puro para la sección "Formación Continua" en lugar de utilizar una captura de pantalla rasterizada.
  - Se ajustó el `viewBox` del SVG (de un ancho de 250 a 190) para recortar el espacio vacío a la derecha y lograr un centrado y simetría perfectos en la interfaz.
- **Por qué se hizo:** Los SVG (Vectores) pesan una fracción de un archivo PNG/JPG, no pierden calidad al hacer zoom en dispositivos móviles, y le dan un aspecto más premium y profesional al proyecto.

## 4. Technical SEO y Open Graph
- **Archivos creados/modificados:** `index.html`, `sitemap.xml`, `robots.txt`, `img/preview.png`
- **Qué se hizo:**
  - **Etiquetas Open Graph (OG) y Twitter Cards:** Se insertaron etiquetas `<meta>` especiales en `index.html`. Éstas le dictan a plataformas como LinkedIn, WhatsApp o Twitter qué título, descripción e imagen exacta deben previsualizar cuando compartas el enlace de tu web.
  - **Banner de previsualización (`preview.png`):** Se generó un fondo abstracto tecnológico con IA y se procesó con Python (Pillow) para recortarlo al estándar exacto de redes sociales (1200x630 píxeles), superponiendo el nombre y cargo. Esto independiza la miniatura del conflicto de los dos idiomas que tiene la página.
  - **`sitemap.xml`:** Se creó un mapa XML indicando a los bots de búsqueda que existe la raíz de la página y que se espera que se actualice mensualmente.
  - **`robots.txt`:** Se creó el archivo de permisos indicando explícitamente a los buscadores (`User-agent: *`) que tienen permiso total de rastrear el sitio, y se proveyó la ruta hacia el sitemap.
- **Por qué se hizo:** Para lograr que la página cumpla con las mejores prácticas de indexación en Google y para que el enlace, al ser compartido en un contexto profesional, actúe visualmente como una tarjeta de presentación de primer nivel.

## 5. Integración con Google Search Console
- **Acción:** Configuración del dominio `https://fernando-pedernera.github.io/` como "Prefijo de URL".
- **Por qué se hizo:** Para forzar a Google a indexar la página rápidamente sin esperar meses a que los bots la descubran por sí solos. La validación fue ágil gracias a la previa integración de Google Analytics en el código.
