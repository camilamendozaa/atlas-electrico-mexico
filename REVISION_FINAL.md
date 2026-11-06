# SOLVIX · revisión académica y cartográfica antes de publicar

## Cambios ejecutados
1. **Distribución**: datos regionales de 2024 incorporados desde CFE, Programa de Ampliación y Modernización de las RGD 2025–2039 (tabla III.1), con selector 2023/2024, variación calculada en km y vínculo directo a la **Figura III.1** del mapa oficial de 16 divisiones.
2. **Distribución**: la cartografía oficial de límites se abre en su fuente CFE. No se crearon polígonos georreferenciados ficticios. Para una capa vectorial interactiva precisa sigue siendo necesario un dataset oficial de polígonos o digitalización debidamente controlada de la fuente.
3. **¿Sabías que?**: cada una de las 20 fichas conserva su explicación y fuente; se incorpora comparación visual de dos indicadores reales según tema, indicando universo, unidad y año. Cuatro comparadores no son 20 nuevas mediciones.
4. **Generación**: la ficha de la central incorpora enlace al mapa externo de las coordenadas publicadas y su año histórico. No convierte los datos de 2016 en actuales.
5. Logo e ícono: sin ninguna modificación.

## Hallazgos QA y advertencias
- Tabla III.1 del CFE PAM 2025–2039: las longitudes de las 16 divisiones de 2024 suman 555,335 km frente a 555,336 km del total publicado. Diferencia de 1 km por agregado de cifras enteras; conservar el total publicado.
- La métrica `servicios (miles)` es redondeada y no es exactamente el padrón de clientes de CFE SSB.
- Simulador trifásico: modelo ideal equilibrado. Pérdidas 3I²R con R de fase; no representa automáticamente pérdidas reales de líneas de toda la red.
- Transformador ideal: no incluye pérdidas ni magnetización.
- Información de plantas: catálogo histórico 2016, coordenadas publicadas y capacidad de esa edición; requiere confirmación antes de etiquetar 2024 o 2026.
- Transmisión: sus cuatro marcadores son **zonas conceptuales**, no puntos de infraestructura trazados con levantamiento geográfico. Enlaces topológicos fundamentados en CENACE.
- Fuente de CFE 2024–2038 (2023): https://beta.cfe.mx/distribucion/cumplimiento/Documents/PAM%20RGD%202024-2038%20VF.pdf
- Fuente de CFE 2025–2039 (2024 y mapa oficial): https://www.cfe.gob.mx/distribucion/cumplimiento/Documents/Programa%20de%20Ampliaci%C3%B3n%20y%20Modernizaci%C3%B3n%20de%20las%20Redes%20Generales%20de%20Distribuci%C3%B3n%202025-2039.pdf

## Rúbrica y finalidades
Identidad visual original, cinco módulos y único clasificador; seis diagramas de conversión; mapas, indicadores, comparadores y simuladores con unidades y fuentes; 20 hallazgos repartidos 5/tema; hitos jurídicos; mejoras registradas; experiencia para estudio; publicación en GitHub Pages **pendiente de realizar y comprobar en línea por el usuario**. Ningún archivo en GitHub se ha modificado desde este paquete local.
