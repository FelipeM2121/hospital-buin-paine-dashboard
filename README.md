# 🏥 Dashboard Mobiliario No Clínico — Hospital Buin Paine

Dashboard interactivo para la gestión y seguimiento del mobiliario no clínico del Hospital Buin Paine, desarrollado con React + TypeScript + Vite.

## 📋 Descripción

Esta herramienta permite visualizar y analizar el estado del mobiliario no clínico distribuido en las distintas unidades del hospital, incluyendo:

- Resumen general con indicadores clave (KPIs)
- Detalle por unidad y por tipo de mobiliario
- Visualización de Especificaciones Técnicas (EETT) en PDF
- Seguimiento del estado de cada ítem (Bueno, Regular, Malo, Faltante)

## 🚀 Tecnologías

- **React 18** + **TypeScript**
- **Vite** — servidor de desarrollo ultrarrápido
- **Recharts** — gráficos interactivos
- **PDF.js (pdfjs-dist v5)** — visualizador de PDFs integrado
- **CSS-in-JS** — estilos inline con sistema de colores centralizado

## 📁 Estructura del proyecto

```
hospital-dashboard/
├── public/
│   └── eett/          # PDFs de Especificaciones Técnicas (no incluidos en el repo)
├── src/
│   ├── App.tsx         # Componente principal con toda la lógica
│   └── main.tsx        # Punto de entrada
├── index.html
├── package.json
└── vite.config.ts
```

## ⚙️ Instalación y uso

### Requisitos previos
- Node.js 18 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/FelipeM2121/hospital-buin-paine-dashboard.git
cd hospital-buin-paine-dashboard

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`

### PDFs de Especificaciones Técnicas

Los archivos PDF no están incluidos en el repositorio por su tamaño. Para habilitarlos, coloca los archivos `.pdf` en la carpeta `public/eett/`.

## 🗂️ Pestañas disponibles

| Pestaña | Descripción |
|---|---|
| 📊 Resumen | KPIs generales y gráficos de estado |
| 🏢 Por Unidad | Detalle de mobiliario por unidad del hospital |
| 🪑 Por Tipo | Agrupación por tipo de ítem |
| 📄 Esp. Técnicas | Visor PDF de especificaciones técnicas con buscador |

## 🔍 Funcionalidades destacadas

- **Buscador de EETT** con filtro por nombre y código, insensible a tildes y mayúsculas
- **Visor PDF integrado** con zoom ajustable, navegación por páginas y ajuste automático al ancho
- **Filtros interactivos** por unidad, tipo y estado del mobiliario
- **Diseño responsivo** adaptado a escritorio

## 📄 Licencia

Uso interno — Hospital Buin Paine © 2025
