# SOLVIX — Etapa 7 / Módulo 03: Distribución eléctrica

## Objetivo académico
Este módulo explica el papel de la distribución dentro del sistema eléctrico mexicano y sirve como material de estudio para TE1020. No contiene exámenes: se aprende explorando las divisiones de CFE, comparando indicadores y experimentando con un transformador ideal.

## Cómo probarlo
1. Descomprime el ZIP conservando sus carpetas.
2. Abre `index.html` con un navegador moderno. No requiere instalar dependencias ni conexión para las interacciones.
3. Busca una división, cambia el año y mueve los cuatro controles del simulador.

## Contenido y trazabilidad
- Divisiones de distribución: 16 regiones con longitud de líneas de media tensión (km) y servicios (miles), **año 2023**. Fuente: CFE, Programa de Ampliación y Modernización RGD 2024–2038, tabla III.1. Las cifras de servicios están redondeadas.
- Infraestructura nacional: informes anuales CFE 2022, 2023, 2024. Para 2022 el inventario de líneas de media tensión ≈548,000 km es aproximado.
- SAIDI: minutos por usuario, duración media de interrupciones, no frecuencia. No se confunde con SAIFI.
- Simulador: modelo monofásico ideal: `Vp / Vs = Np / Ns` y `Vp * Ip = Vs * Is`. No constituye medición o cálculo de red real; no incluye pérdidas ni regulación de tensión.
- No se presentan polígonos regionales porque no se dispone aquí de sus geometrías oficiales verificadas. Nunca se deben sustituir por fronteras estatales.

## Propósito de la actividad
- Distinguir generación, transmisión y distribución.
- Aprender a interpretar potencia/capacidad (MW) frente a energía generada (GWh); comprender el ciclo combinado en el módulo correspondiente.
- Disponer de una guía interactiva para estudiar, sin repetición de cuestionarios.
- Preparar componentes que puedan integrarse en una entrega a GitHub Pages.
- Revisar, comprender y adaptar HTML, CSS y JavaScript generados con apoyo de IA.

## Sobre GitHub Pages
Los archivos son estáticos (`index.html`, `module.css`, `module.js`, `assets/`), sin dependencias ni API keys. Pueden alojarse en una carpeta dentro de un repositorio; aún **no se han integrado ni publicado** en la página principal de SOLVIX. Para publicar el Atlas completo deberán integrarse los módulos y revisar sus enlaces, rutas relativas y navegación.

## Identidad visual
Se conservaron byte por byte los archivos originales proporcionados `solvix-icon.png` y `solvix-logo.png`. Solo se utiliza el ícono en este módulo; el archivo del logo completo se incluye sin modificar para la integración futura. Se mantienen los valores de la paleta SOLVIX, con una disposición limpia similar a los módulos 5–6, sin copiar la estructura de la página anterior.

## Pruebas
- Sintaxis de JS comprobada.
- Interacciones comprobadas en un navegador aislado: búsqueda, selección, año, cálculo de transformador y restablecimiento.
- Vistas de 1440, 390 y 320 px comprobadas sin desbordamiento horizontal.
- Capturas de la versión de escritorio y móvil incluidas como archivos aparte.
