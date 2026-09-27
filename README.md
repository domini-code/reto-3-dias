# Reto de 3 días · de un Issue a código verificado

Repo de práctica del ebook **[Revisión por Contrato](https://workshop.dominicode.com/ebook)** — Dominicode.

Tres días, entre quince y veinticinco minutos cada uno. Al final habrás
convertido un issue real en una especificación que un agente puede ejecutar, la
habrás ejecutado, y habrás leído un veredicto en vez de un diff.

No hay nada que instalar aparte de las dependencias, y no hay que registrarse en
nada para clonarlo.

| Día | Qué haces | Tiempo |
|---|---|---|
| [Día 1 · Especificar](retos/dia-1.md) | Conviertes el issue 06 en un contrato con criterios comprobables | ~20 min |
| [Día 2 · Implementar](retos/dia-2.md) | Le das el contrato a tu agente y no miras el diff | ~20 min |
| [Día 3 · Verificar](retos/dia-3.md) | Lees el veredicto, y ves qué pasa cuando alguien afloja un test | ~25 min |

## Qué hay aquí

Una API de facturación pequeña y real: Fastify, Prisma sobre SQLite, Vitest en
dos proyectos, ESLint. Veintiséis tests en verde.

```
AGENTS.md                  El contrato permanente del repo. Es el del ebook.
specs/spec.template.md     La plantilla de contrato de una tarea.
specs/ejemplo-emitir-factura/  Un contrato ya resuelto, para ver la forma.
issues/                    Tres issues reales. El 06 es el del reto.
scripts/veredicto.mjs      Ejecuta los criterios de una spec y dicta PASA o FALLA.
src/                       La API.
```

## Puesta en marcha

Necesitas Node 24 o superior y pnpm.

```bash
pnpm install
pnpm veredicto specs/ejemplo-emitir-factura/spec.md
```

El segundo comando tiene que salir en verde, con los cinco criterios en `PASA`.
Si no, arréglalo antes de empezar: el Día 3 se apoya en que esto funcione.

Si prefieres comprobarlo a mano:

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm smoke
```

## Los tres issues

| # | Tipo | Tarea | Nivel |
|---|---|---|---|
| [06](issues/06-emitir-dos-veces.md) | bug | Emitir dos veces una factura le cambia el número | ★☆☆ |
| [01](issues/01-anular-factura.md) | feature | Anular una factura emitida | ★☆☆ |
| [05](issues/05-precio-un-decimal.md) | bug | Un precio con un solo decimal se registra mal | ★☆☆ |

**El reto va sobre el 06.** Los otros dos están para cuando termines: el 01 es
una feature en vez de un bug, y el 05 toca `src/lib/money.ts`, que está en los
límites del `AGENTS.md` — la spec tiene que autorizarlo y decir por qué. Es el
caso más interesante de los tres.

## Qué no hay aquí

Esto es un repo preparado: el `AGENTS.md` ya está escrito, el harness ya existe
y el proyecto cabe en una pantalla. Tu repo no se parece a esto.

Lo que aquí no vas a encontrar, y que es justo lo que separa un ejercicio de un
sistema montado:

- **Auditar un repo de verdad** y decidir qué entra en el bucle corto cuando los tests tardan doce minutos.
- **La capa que impide, no la que declara.** Aquí los límites son una lista en markdown. En un repo montado hay hooks y permisos que rechazan la escritura antes de que ocurra.
- **Un segundo agente que revisa** el trabajo del primero contra el contrato, sin haber escrito el código.
- **El ciclo cerrado:** del Issue a la spec, de la spec al plan, del plan al veredicto y del veredicto a una PR con las evidencias pegadas.
- **Saber cuándo el contrato está mal escrito** y no es culpa del agente.

Eso es el workshop: **[Contract Based Review Method](https://workshop.dominicode.com)**.

## Licencia

Código bajo licencia MIT. El texto del `AGENTS.md`, los issues y los retos son de
Bezael Pérez · [Dominicode](https://dominicode.com).
