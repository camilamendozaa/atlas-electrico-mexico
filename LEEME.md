# SOLVIX · Etapa 6 — Transmisión eléctrica

## Cómo probar

1. Descomprime el ZIP completo y conserva las carpetas tal como aparecen.
2. Abre `index.html` con un navegador moderno. No requiere servidor, instalación ni internet para la operación del módulo.
3. Usa las cuatro opciones del explorador para conocer los sistemas eléctricos.
4. Cambia de año para consultar las cifras de CFE Transmisión.
5. Desplaza los controles del simulador para observar corriente, pérdidas y comparación entre tensiones.

## Archivos

- `index.html`: estructura accesible del módulo.
- `module.css`: estilos SOLVIX, usando estrictamente los colores de la marca existente.
- `module.js`: lógica del explorador, las cifras y el simulador.
- `map-path.js`: contorno generalizado del país incrustado para abrir el prototipo sin conexión.
- `mexico-path.txt`: copia del contorno de Natural Earth usado en el Módulo 1.
- `assets/solvix-icon.png`, `assets/solvix-logo.png`: archivos **originales e idénticos** a los entregados, no redibujados.

## Procedencia de cifras

| Indicador | 2022 | 2023 | 2024 | Fuente |
|---|---:|---:|---:|---|
| Líneas (km) | 110,449 | 110,559 | 111,138 | CFE 2022 PDF 125; CFE 2023 PDF 120; CFE 2024 PDF 79 |
| Subestaciones | 2,279 | 2,302 | 2,317 | Mismas fuentes |
| Transformación (MVA) | 165,541 | 164,992 | 168,981 | Mismas fuentes |

El informe CFE 2024 reimprime la longitud de 2023 como **110,558 km** (frente a 110,559 km en la edición original). La serie principal utiliza el dato original de 2023 y documenta esa divergencia.

### Sistemas eléctricos

Las **Bases del Mercado Eléctrico** (DOF; definiciones 2.1.125–2.1.129 y Base 7) describen los cuatro sistemas del SEN y las condiciones de aislamiento entre ellos. Baja California se interconecta con el WECC estadounidense y permanece separada físicamente del SIN, Baja California Sur y Mulegé.

DOF: https://sidof.segob.gob.mx/notas/docFuente/5407715

La forma de México es un contorno generalizado de Natural Earth, usado solo como **contexto geográfico**. No contiene rutas eléctricas. El esquema contiguo muestra relaciones, no coordenadas, circuitos, trayectorias, número de líneas ni fronteras eléctricas exactas. **No se inventaron trazos de transmisión.**

### Modelo trifásico

- Potencia activa de envío `P` en MW y tensión de línea `V` en kV.
- Factor de potencia `cos φ` entre 0.70 y 1.00 (valor inicial 1).
- `R` es la **resistencia equivalente total por fase**, expresada en Ω/fase; no es Ω/km.
- `I = P·10^6 / (sqrt(3) · V·10^3 · cos φ)` en A.
- `P_perdidas = 3·I²·R / 10^6` en MW.
- Voltajes de 115, 230 y 400 kV **son ejemplos para comparar**, no recorridos de líneas concretas.
- Supone red trifásica equilibrada, régimen estacionario y tensión constante. No es un flujo de cargas, un modelo de red real ni estimación de pérdidas observadas de CFE.
- Cuando `P_perdidas >= P`, aparece una advertencia de que el escenario queda fuera de un régimen útil de esta simplificación.

## Verificación funcional realizada

- Cambio de cuatro sistemas, etiquetas y estado `aria-pressed`.
- Selección de años y actualización de las tres cifras de infraestructura.
- Precisión de control de tensión, cálculo de corriente, pérdidas y restablecimiento.
- Comprobación con P=120 MW, V=230 kV, cosφ=1 y R=3 Ω/fase: I≈301.2 A; pérdidas≈0.816 MW.
- Pruebas de presentación en ventanas de 1440, 390 y 320 píxeles, sin errores JS ni desplazamiento horizontal.
- Coincidencia SHA256 de los archivos originales de marca.

## Alcance y limitaciones

Este es el **Módulo 2 de transmisión** (Etapa 6) independiente del resto del Atlas y susceptible de integración posterior. No se ha alterado la página original del usuario ni se ha iniciado la Etapa 7. La interfaz no pretende representar topología ni georrutas de subestaciones; para agregar esas capas será necesario un conjunto geoespacial oficial con puntos y segmentos reales. No se añadieron exámenes ni trivias.
