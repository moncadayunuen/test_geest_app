# Nexo - Gestor de contactos

Nexo es una interfaz web para administrar el directorio de un equipo. El proyecto fue desarrollado como prueba técnica frontend con especial atención a UX, accesibilidad, estados del sistema y calidad visual.

## Funcionalidades

- Carga inicial simulada desde `public/data.json` con skeleton loading y latencia controlada.
- Búsqueda reactiva por nombre.
- Filtros combinables por departamento y contador de resultados.
- Tabla completa con scroll horizontal en escritorio y tooltips para correo y teléfono.
- Alta de contactos en modal con Formik, Yup y UUID nativo.
- Validación en tiempo real y bloqueo de envío cuando el formulario es inválido.
- Eliminación con confirmación para prevenir errores.
- Empty states diferenciados para directorio vacío y búsqueda o filtros sin coincidencias.
- Feedback mediante notificaciones accesibles.
- Diseño responsive con filas desplegables y scroll táctil en móvil.
- Navegación por teclado, cierre de modales con `Escape`, foco visible, etiquetas semánticas y soporte para movimiento reducido.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Sass con estilos co-localizados por componente
- Formik + Yup
- Zustand para estado de dominio
- Sistema propio de iconos SVG
- Vinext / Vite

## Ejecutar localmente

Requisitos: Node.js 22.13 o superior y npm.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción
npm run start    # Ejecutar la compilación
npm run lint     # Revisión estática
```

## Decisiones de UX/UI

- **Jerarquía operativa:** la acción principal, la búsqueda, los filtros y el directorio aparecen en el orden natural de trabajo.
- **Prevención de errores:** validación contextual, botón deshabilitado y confirmación antes de eliminar.
- **Visibilidad del estado:** skeleton, contadores, mensajes vacíos, errores de carga y confirmaciones mantienen informada a la persona usuaria.
- **Filtros comprensibles:** los chips muestran la cantidad disponible y se combinan con la búsqueda sin pasos adicionales.
- **Datos legibles:** correo y teléfono conservan el ancho de la tabla y muestran su valor completo mediante tooltip.
- **Responsive por contexto:** la tabla mantiene todas las columnas con desplazamiento horizontal en escritorio; en móvil prioriza nombre, ID, avatar y acciones, dejando el resto bajo demanda.
- **Escalabilidad visual:** los componentes y tokens mantienen consistencia y permiten extender el sistema a más vistas.

## Convenciones de código y estilos

- JSX y TypeScript se escriben con indentación por bloques para mantener clara la jerarquía del DOM y la lógica.
- Cada componente conserva su SCSS co-localizado y utiliza BEM para elementos y modificadores propios.
- Sass comparte colores, radios, sombras y mixins mediante `@use` desde `styles/_tokens.scss`.
- Tailwind se referencia con `@reference` y sus utilidades se agrupan con `@apply` únicamente para layout repetitivo.
- La cascada queda ordenada de base a componente, estados, animaciones y media queries.
- Los hooks mantienen un flujo predecible: estado local, valores derivados, acciones y retorno público.

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
