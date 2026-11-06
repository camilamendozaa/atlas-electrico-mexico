# Informe técnico · Etapa 10 de SOLVIX

## Cambios aplicados

| Área | Antes | Mejora |
|---|---|---|
| Portada | Presentación amplia | Espaciado ligeramente más compacto, sin cambiar la composición |
| Cartografía de generación | Ubicaciones de la base histórica | Advertencia 2016 más explícita en la portada |
| Navegación móvil | Selector de módulos compacto | Objetivos táctiles ≥44 px en barra de navegación y ancho adaptable |
| Accesibilidad | Foco disponible | Foco más uniforme en controles y respeto de movimiento reducido |
| Apariencia | Paleta SOLVIX | Se conserva la paleta, la jerarquía de lectura y los cinco módulos |
| Logotipos | Imágenes originales | **No se han modificado** (comprobación binaria de 10 copias) |

## Pruebas realizadas

| Prueba | Resultado |
|---|---:|
| Acciones funcionales en Chromium aislado | **24 / 24** |
| Revisiones visuales: 6 rutas × 3 anchos | **18 / 18** |
| Desbordamientos horizontales detectados | **0** |
| Errores de JavaScript detectados | **0** |
| Referencias locales HTML revisadas | **56 / 56 existentes** |
| Copias de imágenes de marca iguales a originales | **10 / 10** |

**Tamaños de prueba visual:** 1440, 390 y 320 px. Los resultados no equivalen a una certificación WCAG ni garantizan comportamiento idéntico en todos los navegadores.

## Validaciones didácticas heredadas y reejecutadas

- La portada incluye 15 marcadores de centrales con selección por teclado.
- Los filtros por tipo y la búsqueda de centrales siguen respondiendo.
- Los cálculos de transmisión siguen usando I=P/(√3·V·cosφ) y Ppérdidas=3I²R para el modelo trifásico balanceado.
- El transformador sigue respondiendo a Vp/Vs=Np/Ns y Vp·Ip=Vs·Is bajo el supuesto ideal.
- El explorador registra las 16 divisiones de distribución; «¿Sabías que?» presenta 20 fichas, no un cuestionario adicional.

## Límites documentados

1. **No se ha publicado en GitHub Pages:** la verificación de rutas y de navegación en el dominio público corresponde a la Etapa 11.
2. **Distribución:** faltan polígonos geográficos oficiales de las 16 divisiones; el explorador actual es por lista y datos. No se debe llamar a esa vista «mapa geográfico de divisiones».
3. **Transmisión:** la estructura de sistemas se presenta como esquema, no como ruta geográfica de circuitos reales.
4. **Centrales:** MW y coordenadas individuales son del registro histórico de 2016; no representan el parque instalado de 2024 o 2026.
5. Las discrepancias entre informes oficiales se preservan en el expediente documental; no se reemplazan silenciosamente.

## Dictamen

**Apta para revisión por la usuaria y preparación de publicación**, con los límites anteriores visibles. La Etapa 10 no altera la página anterior de SOLVIX ni presupone la aprobación final de la publicación.
