# SOLVIX — Etapa 4: Módulo 00 (Recursos Energéticos)

## Cómo utilizar
Abrir `index.html` en navegador moderno. No requiere instalar dependencias ni conexión a Internet.

## Identidad original
`styles.css` es una copia **idéntica** del CSS entregado. `assets/solvix-logo.png` y `assets/solvix-icon.png` son copias de los archivos originales, sin ediciones. El código nuevo está exclusivamente en `index.html`, `module.css` y `module.js` **dentro de esta carpeta independiente**; la web original no fue alterada. No se han creado logotipos con IA.

## Funciones incluidas
- Cinco conceptos explicados mediante selección.
- Clasificación de fósiles, nucleares y renovables.
- Seis rutas de conversión de energía con etapas clicables.
- Actividad accesible de 15 tarjetas con retroalimentación y puntuación.
- Barras interactivas de generación bruta de CFE (2022–2024) por tecnología.
- Comparador conceptual de dos recursos, sin factores de emisión inventados.
- Cinco indicadores de reflexión y cinco preguntas de interpretación.

## Fuentes y universo
- CFE, Informe Anual 2023 (generación bruta de 2022 y 2023, anexo de generación agregada, p. impresa ~300).
- CFE, Informe Anual 2024 (generación bruta de 2024, p. PDF 29; generación limpia, p. PDF 30).
- Nota: totales impresos versus sumas de desgloses pueden diferir en ~1 GWh por redondeo/editorial, no se inventa una categoría de balance.
- Son datos **CFE**, no producción de todo México/SEN. La categoría **limpia** no significa lo mismo que **renovable**.
- Las explicaciones ambientales son cualitativas. No se asignan factores de emisión cuantitativos sin fuentes documentales comparables.

## Validación de la versión final
- Revisión de sintaxis de `module.js`: correcta.
- Pruebas automatizadas de interacción en anchos de 1440, 768, 390 y 320 px: sin errores JavaScript ni desbordamiento horizontal.
- Se probaron 6 rutas × 5 etapas, las 11 categorías gráficas, el cambio entre 3 años, los 15 reactivos de clasificación, reinicio y las 5 preguntas de interpretación.
- Archivos `styles.css`, `assets/solvix-logo.png` y `assets/solvix-icon.png` contrastados contra los originales mediante SHA-256: copias idénticas.
- Atributos de accesibilidad para la barra de progreso y selección de tecnología; se mantiene compatibilidad por teclado con botones y controles nativos.
- **Nota sobre la prueba:** la interacción se ejecutó en un navegador de pruebas con el HTML, CSS, JS y recursos embebidos en memoria porque la navegación a archivos locales está restringida en este entorno. Se entrega la estructura original con archivos relativos para uso local habitual; no constituye una auditoría exhaustiva de accesibilidad ni de todos los navegadores.

## Criterios de aceptación del Módulo 00
1. Diferencia recurso, combustible, transformación, tecnología y electricidad.
2. Explica seis caminos simplificados de conversión energética.
3. Permite practicar con 15 tarjetas y revisar retroalimentación.
4. Compara generación bruta CFE por tecnología en 2022, 2023 y 2024, con total y referencia.
5. Ofrece comparación conceptual y cinco preguntas de interpretación.
6. Nunca confunde MW con GWh ni «limpia» con «renovable», ni confunde CFE con SEN.
7. Conserva los recursos gráficos originales de SOLVIX sin modificaciones.

## Pendiente para integración
- Confirmar navegación global de la futura aplicación de cinco módulos. Esta entrega cubre únicamente Módulo 00.
- Validación final con rúbrica docente, y pruebas completas de accesibilidad y distintos dispositivos.
