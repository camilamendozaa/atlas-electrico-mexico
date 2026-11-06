# SOLVIX — Etapa 5: Generación eléctrica

**Entrega académica interactiva, independiente del sitio original.**

## Cómo abrir
1. Descomprime el ZIP.
2. Abre `index.html` en un navegador moderno. No requiere servidores ni conexión a Internet para los mapas y gráficas.
3. Selecciona una central en el mapa o desde la lista, escribe un nombre/estado o aplica filtros.
4. En Datos 2022–2024, cambia de año y elige dos tecnologías para comparar.

## Contenido
- Un mapa de México dibujado a partir de un contorno generalizado de Natural Earth. Los 15 marcadores se proyectan con latitud/longitud históricas de una base de 2016 (WRI, con origen energético mexicano SENER/CFE/CENACE). Los MW son **históricos de 2016**, no capacidades actuales.
- 15 plantas en 10 estados y al menos 4 tecnologías, seleccionables por mapa/lista, con fichas y coordenadas.
- Indicadores y series de generación **bruta** de CFE 2022, 2023 y 2024, según informes anuales de CFE. CFE **no equivale a todo el SEN**.
- Gráfica de todas las tecnologías y comparador anual de dos series.
- Fuente jurídica o cartográfica y discrepancias claramente delimitadas en el expediente de Etapas 1 y 2.

## Decisiones de diseño
- Sin cuestionarios ni exámenes.
- La interfaz tiene mapa como elemento principal, filtros pequeños, ficha lateral y gráficos después; prioriza simplicidad y legibilidad.
- Se reutiliza el **archivo original** `solvix-icon.png` sin modificación. También se incluye el archivo original `solvix-logo.png` sin modificación, aunque la cabecera utiliza el ícono más un texto para ahorrar espacio.
- El CSS del módulo es nuevo; **no modifica** `styles.css` del sitio anterior.

## Precauciones técnicas y académicas
- Los puntos representan coordenadas documentadas para centrales en la base histórica; no implican ubicación exacta de cada unidad generadora.
- El contorno geográfico es generalizado y **no muestra transmisión** ni fronteras de distribución.
- Los valores por central en MW son capacidad, no generación bruta en GWh ni una serie comparable 2022–2024.
- Las gráficas agregadas proceden de CFE; no deben interpretarse como producción de las 15 centrales.
- Totales impresos brutos de CFE para 2022 y 2023 difieren 1 GWh de la suma de las once tecnologías redondeadas. Esta discrepancia se conserva.
- Participación de energías limpias 2022–2023 calculada de datos brutos redondeados; en 2024 la fuente publica 38,982.9 GWh de tecnologías limpias (25.3% de 154,059 GWh).

## Fuentes
- `Informe Anual 2023.pdf` de CFE: anexo estadístico, p. impresa 300 para generación 2022–2023.
- `Informe Anual 2024.pdf` de CFE: pp. PDF 29–30 para generación bruta 2023–2024 y aportaciones de fuentes limpias.
- `Etapa1_Expediente_Cierre_Solvix.md`: inventario geográfico completo con identificadores y advertencias.
- WRI Global Power Plant Database (base México, origen nacional, 2016): https://github.com/wri/global-power-plant-database
- Natural Earth para generalización de contorno cartográfico: https://www.naturalearthdata.com/

## Verificación efectuada
- Sintaxis de JavaScript sin errores.
- 15 marcadores, 15 entradas seleccionables.
- Filtros: 5 hidráulicas, 3 gas, 2 eólicas, 2 geotérmicas, 3 otras.
- Búsqueda `Altamira` devuelve dos centrales.
- Cambio de año 2022/2023/2024 actualiza cifras oficiales.
- Puntos seleccionables, valores y gráficas generados.
- Sin desbordamiento horizontal en pruebas de 320, 390, 768 y 1440 px.
- Se probaron interacciones en Chromium aislado mediante HTML/CSS/JS embebidos, debido a restricciones del navegador de pruebas para cargar rutas locales.
