# AGENTS.md

API de facturación interna. Emite y consulta facturas para el equipo de
operaciones. No es público: todo el tráfico entra por el gateway, así que aquí
no hay autenticación ni rate limiting, y no se añaden.

Este fichero es el contrato permanente del repositorio. El contrato de cada
tarea vive en `specs/<slug>/spec.md`.

## Stack

- **Lenguaje:** TypeScript 6, Node 24 LTS, ESM (`"type": "module"`, imports con extensión `.js`)
- **Framework:** Fastify 5
- **Gestor de paquetes:** pnpm — derivado de `pnpm-lock.yaml`. No uses otro.
- **Base de datos:** SQLite vía Prisma 7 con el adaptador `better-sqlite3`. Fichero local en `data/`, sin servicios externos.
- **Tests:** Vitest 4, en dos proyectos: `unit` (lib y servicios) y `api` (rutas con `inject`)
- **Lint:** ESLint 10 con `typescript-eslint`, flat config en `eslint.config.js`

## Cómo se trabaja aquí

1. Toda tarea sale de un issue y se firma en `specs/<slug>/spec.md` **antes** de
   escribir código (plantilla en `specs/spec.template.md`).
2. La rama se llama `feat/<slug>`, `fix/<slug>` o `refactor/<slug>`. El slug es el
   de la carpeta de la spec: así sabe el veredicto qué contrato aplicar.
3. Se implementa lo que pide la spec, dentro de su alcance de modificación.
4. Antes de abrir la PR: `pnpm veredicto specs/<slug>/spec.md`. Lo que sale de ahí
   es lo que lee quien revisa, en vez del diff.

## Convenciones

Detectadas leyendo el código, no impuestas desde fuera:

- Los handlers de `src/routes/` no hablan con Prisma. Pasan por un servicio de `src/services/`.
- Todo error de dominio es un `AppError` de `src/lib/errors.ts`, con un código del catálogo `ERROR_CODES`. No se lanzan strings ni `Error` pelado: eso es un 500 y se investiga.
- Los importes son céntimos enteros en el código y en la base. Entran y salen de la API como string decimal (`"1234.56"`) a través de `src/lib/money.ts`. Nunca `Float`.
- Los estados de una factura están en `STATUSES` (`src/services/invoices.ts`), no en el esquema: SQLite no tiene enums.
- Los tests van junto al fichero que prueban, como `*.test.ts`. Cada fichero crea su propia SQLite en memoria con `createTestDb()`; no comparten estado.
- Las fechas se guardan y se devuelven en UTC, ISO 8601.
- La validación de entrada es JSON Schema en la ruta (`schema.body`). El servicio da por buena la forma y valida el dominio.
- El código está en inglés (`buildApp`, `createInvoice`, `issueInvoice`). La API pública sigue en español: rutas (`/clientes`, `/facturas/:id/emitir`), campos JSON (`nombre`, `rnc`, `numero`, `estado`, `lineas`) y códigos de error. `toDto()` en `src/services/invoices.ts` es donde se juntan las dos.

## Definición de terminado

Una tarea está terminada cuando:

1. El bucle corto pasa en verde.
2. El bucle largo pasa en verde.
3. Cada criterio de aceptación de la spec tiene evidencia: qué comando lo
   demuestra y cuál fue su salida.
4. El diff no contiene nada que la spec no pidiera.

El punto 4 es el que más se olvida. **Código de más es código sin contrato.**

## Límites

Sin permiso explícito en la spec de la tarea, el agente no toca:

- `prisma/migrations/` ni `prisma/schema.prisma`. Una migración se revisa a mano, siempre.
- `.github/workflows/` ni nada de despliegue.
- `package.json`: no se añaden ni se actualizan dependencias. Si hace falta una, para y pregunta.
- `pnpm-lock.yaml`: lo mismo, y no se regenera "de paso".
- `.env`, `.env.*` ni ningún fichero con credenciales.
- `src/lib/money.ts`. Es aritmética de céntimos y ya nos ha mordido dos veces.
- `scripts/veredicto.mjs`. Quien recibe el veredicto no edita a quien lo emite.
- Los asserts de los tests que ya existen. Añadir tests nuevos, sí. Cambiar los que ya estaban, no: eso se corrige aparte y a mano.

Un fichero de esta lista solo puede entrar en el alcance de una spec con una
persona firmando el motivo. El issue 05 es exactamente ese caso.

## Verificación

Estos comandos están ejecutados y comprobados. Son el harness: si uno falla, el
trabajo no está hecho.

### Bucle corto — después de cada cambio

```bash
pnpm typecheck      # ~3s   tsc --noEmit
pnpm lint           # ~2s   eslint .
pnpm test:unit      # ~2s   vitest, proyecto unit
```

### Bucle largo — antes de abrir la PR

```bash
pnpm build          # ~2s   tsc -p tsconfig.build.json -> dist/
pnpm test           # ~2s   vitest, unit + api
pnpm smoke          # ~3s   arranca la app en un puerto libre y pega a /health
```

Los tiempos están medidos en caliente en un portátil; la primera ejecución de
cada comando tarda bastante más porque llena su caché. Son tuyos para actualizar.
No son decoración: son lo que te deja ver, dentro de seis meses, si el bucle
corto sigue siendo corto.

### Rojos conocidos

Ninguno. Todo el harness está en verde en `main`. **Si algo falla, lo rompiste tú.**
