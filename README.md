# Nexo - Gestor de contactos

Nexo es una interfaz web para consultar y administrar el directorio de un equipo. Está desarrollada como una prueba técnica frontend con Next.js y datos locales.

## Funcionalidades

- Carga inicial desde `public/data.json`, con estados de carga y error.
- Búsqueda reactiva por nombre.
- Filtros combinables por departamento y contador de resultados.
- Tabla adaptable con tooltips para correo y teléfono; el scroll horizontal aparece sólo cuando el ancho disponible lo requiere.
- Alta de contactos en modal con Formik, Yup y UUID nativo.
- Validación en tiempo real y bloqueo de envío cuando el formulario es inválido.
- Eliminación con confirmación para prevenir errores.
- Empty states diferenciados para directorio vacío y búsqueda o filtros sin coincidencias.
- Feedback mediante notificaciones accesibles.
- Diseño responsive con filas desplegables y scroll táctil en móvil.
- Navegación por teclado, foco contenido dentro de los modales, cierre con `Escape`, restauración de foco y soporte para movimiento reducido.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Sass con estilos co-localizados por componente
- Formik + Yup
- Zustand para estado de dominio
- Sistema propio de iconos SVG
- Next.js 16 con App Router
- Webpack para el build de producción en Vercel

## Ejecutar localmente

Requisitos: Node.js 22.13 o superior y npm.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

El proyecto utiliza el preset de Next.js y genera la salida de producción en `.next`.

- Build Command: `npm run build`
- Output Directory: dejar vacío para que Vercel utilice el valor de Next.js
- Node.js: 22.x o superior

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción
npm run start    # Ejecutar la compilación
npm run lint     # Revisión estática
```

## Decisiones principales

- La búsqueda y el filtro por departamento se calculan en memoria porque la fuente de datos es pequeña y local.
- Zustand mantiene los contactos y sus acciones fuera de los componentes de presentación.
- Formik administra el formulario y Yup concentra sus reglas de validación.
- Antes de eliminar un contacto se solicita confirmación; las altas y eliminaciones muestran una notificación temporal.
- En móvil, cada contacto muestra primero la información esencial y permite desplegar el resto.
- Los modales bloquean el scroll de fondo, contienen el foco y lo devuelven al elemento que los abrió.

## Convenciones de código y estilos

- JSX y TypeScript se escriben con indentación por bloques para mantener clara la jerarquía del DOM y la lógica.
- Cada componente visual conserva un archivo SCSS junto a su TSX.
- Los estilos usan utilidades de Tailwind mediante `@apply`; Sass se conserva para anidación, tokens, animaciones y reglas que no tienen una utilidad clara.
- Los modificadores visuales propios siguen una nomenclatura BEM, por ejemplo `contact-filters__option--selected`.
- La lógica compartida de filtros, mensajes y accesibilidad de diálogos vive en hooks separados.

## Estructura principal

```text
app/
  layout.tsx       Metadatos y configuración global
  page.tsx         Punto de entrada de la vista
  vendor.css       Entrada aislada para Tailwind
  globals.scss     Tokens, reset y estilos base
config/
  site.ts          Configuración centralizada de SEO y dominio
styles/
  _tokens.scss     Tokens y mixins compartidos con Sass
components/
  icon/                Iconografía SVG propia y tipada
  announcement-banner/ Resumen contextual descartable
  text-field/          Control de formulario reutilizable
  confirmation-modal/ Modal de confirmación configurable
  add-contact-modal/  Formulario de alta del dominio
  contact-list/       Tabla, tooltips y detalle responsive de contactos
  contact-filters/    Chips de departamento con conteos
  directory-state/    Estados de carga, error y vacío
  contact-manager/    Composición de la vista y estado
  */                  Cada componente contiene su TSX y SCSS
hooks/
  use-contact-filters.ts Filtrado y conteos derivados
  use-dialog-accessibility.ts Gestión de foco, teclado y scroll en diálogos
  use-modal-exit.ts      Transición y desmontaje de modales
  use-timed-message.ts   Ciclo de vida de notificaciones
stores/
  contact-store.ts Estado y acciones del directorio con Zustand
lib/
  contacts.ts      Validación y utilidades del dominio
types/
  contact.ts       Tipos y constantes compartidas
public/
  data.json        Estado inicial de contactos
```
