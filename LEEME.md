# SOLVIX · Atlas Eléctrico de México
## Etapa 10 — Iteración de pulido y revisión final previa a publicación

Esta carpeta contiene la aplicación integrada y pulida en la Etapa 10. Conserva **cinco módulos** y la portada con un mapa interactivo de 15 centrales (base histórica, año 2016).

### Cómo revisar

1. Abrir `index.html` desde la carpeta extraída. El Atlas es estático: HTML, CSS y JavaScript sin servidor de aplicación.
2. Utilizar los accesos de portada o el selector «Cambiar módulo» para recorrer los cinco módulos.
3. Probar el mapa de centrales, los simuladores, las fichas, el explorador de las 16 divisiones y la actividad breve.

**Nota sobre las pruebas:** en el entorno de validación se bloquearon las navegaciones directas `file://`. Se realizaron pruebas aisladas con Chromium (18 vistas, 24 acciones funcionales), revisión estática de enlaces y sintaxis de JavaScript. Debe verificarse la navegación real después de publicar.

### Qué se mejoró

- Espaciado de la portada para hacer el contenido más legible sin cambiar su composición.
- Navegación entre módulos: controles táctiles con un alto mínimo de 44 px, foco visible y comportamiento adaptable.
- Navegación a secciones con desplazamiento menos abrupto y respeto a la preferencia de movimiento reducido.
- Texto más específico sobre el año de los registros de centrales; la cifra de MW de cada central es histórica (2016), no la de 2024.
- Misma paleta original, logotipos y archivos de ícono sin modificación.

### Alcance y precisión

- **Generación:** mapa de 15 centrales basado en coordenadas históricas publicadas; gráficas CFE de generación bruta 2022–2024.
- **Transmisión:** esquema de SIN, Baja California, Baja California Sur y Mulegé; no inventa rutas de líneas eléctricas reales.
- **Distribución:** explorador de las 16 divisiones administrativas CFE (base 2023). **No incluye polígonos geográficos oficiales**; estos no deben fabricarse a partir de fronteras estatales.
- **Aprendizaje:** recursos, conversión, simuladores de transmisión y transformación, y 20 fichas «¿Sabías que?». Se mantiene una sola actividad de clasificación.
- **Marco jurídico:** hitos del sector eléctrico 2013–2025, identificados como contexto histórico.

### Estado

Etapa 10 concluida dentro del alcance de pulido local y pruebas aisladas. **Etapa 11 (publicación y verificación de GitHub Pages) no realizada.** No se subió ni modificó el repositorio o la web anterior de SOLVIX.

Consultar `QA_Etapa10_Informe.md` para los resultados y límites de las pruebas.


## Actualización del mapa de transmisión (Etapa 11)

En `modulos/transmision/index.html` el mapa dejó de ser decorativo: cuatro marcadores seleccionables enfocan las zonas conceptuales y actualizan la ficha. Incluye acercar, alejar y vista completa, con operación por teclado. Los marcadores son ORIENTATIVOS (no son nodos, rutas ni límites exactos de la RNT).


## Actualización — navegación de mapas

Portada y módulo Generación: seleccionar centrales centra/acerca el mapa, con controles +, − y volver a vista general. Transmisión conserva sus cuatro zonas y navegación interactiva. Distribución no incorpora fronteras regionales no verificadas: su explorador sigue siendo una lista interactiva de 16 divisiones, no un mapa geográfico.

La cartografía y los registros históricos no fueron modificados; las capacidades por central son de 2016.
