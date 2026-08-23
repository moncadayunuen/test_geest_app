# Nexo - Gestor de contactos

Nexo es una interfaz web para administrar el directorio de un equipo. El proyecto fue desarrollado como prueba técnica frontend con especial atención a UX, accesibilidad, estados del sistema y calidad visual.

## Funcionalidades

- Carga inicial desde `public/data.json` con skeleton loading.
- Búsqueda reactiva por nombre.
- Filtros combinables por departamento y contador de resultados.
- Alta de contactos en modal con Formik, Yup y UUID nativo.
- Validación en tiempo real y bloqueo de envío cuando el formulario es inválido.
- Eliminación con confirmación para prevenir errores.
- Empty states diferenciados para directorio vacío y filtros sin coincidencias.
- Feedback mediante notificaciones accesibles.
- Diseño responsive para escritorio, tablet y móvil.
- Navegación por teclado, foco visible, etiquetas semánticas y soporte para movimiento reducido.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Formik + Yup
- Lucide React
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

- **Jerarquía operativa:** la acción principal, los indicadores y el directorio aparecen en el orden natural de trabajo.
- **Prevención de errores:** validación contextual, botón deshabilitado y confirmación antes de eliminar.
- **Visibilidad del estado:** skeleton, contadores, mensajes vacíos, errores de carga y confirmaciones mantienen informada a la persona usuaria.
- **Filtros comprensibles:** los chips muestran la cantidad disponible y se combinan con la búsqueda sin pasos adicionales.
- **Escalabilidad visual:** los componentes y tokens mantienen consistencia y permiten extender el sistema a más vistas.

## Estructura principal

```text
app/
  layout.tsx       Metadatos y configuración global
  page.tsx         Lógica, componentes y estados del directorio
  globals.css      Tokens y estilos base
  product.css      Estados y superficies interactivas
public/
  data.json        Estado inicial de contactos
```

## Mejoras futuras

- Pruebas unitarias y end-to-end.
- Persistencia mediante API y base de datos.
- Edición de contactos, paginación y ordenamiento.
- Roles, permisos y registro de actividad.
