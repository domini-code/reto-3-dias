# Día 1 · Especificar

**~20 minutos. Hoy no se escribe código.**

Hoy conviertes un issue en algo que un agente puede ejecutar y algo que no seas
tú puede rechazar.

---

## Antes de empezar (3 min)

```bash
pnpm install
pnpm veredicto specs/ejemplo-emitir-factura/spec.md
```

Cinco criterios en `PASA`. Si sale rojo, para aquí y arregla la instalación: el
Día 3 no funciona sin esto.

## 1. Lee el contrato permanente (5 min)

Abre [`AGENTS.md`](../AGENTS.md) y léelo entero. Son dos páginas.

Es el mismo fichero del ebook, con los valores de verdad de este repo. Fíjate en
tres cosas:

- **La definición de terminado.** Cuatro puntos. El cuarto es *"el diff no contiene nada que la spec no pidiera"*.
- **Los límites.** Lo que el agente no toca sin permiso explícito.
- **La verificación.** Bucle corto, bucle largo, rojos conocidos.

Nada de eso es tuyo todavía. Hoy escribes la otra mitad: el contrato de **esta**
tarea.

## 2. Lee el issue (2 min)

[`issues/06-emitir-dos-veces.md`](../issues/06-emitir-dos-veces.md)

Un bug pequeño: emitir dos veces la misma factura le asigna un número nuevo y
deja un hueco en la numeración correlativa. Un reintento de red basta para
provocarlo.

## 3. Escribe el contrato (10 min)

```bash
mkdir -p specs/emitir-dos-veces
cp specs/spec.template.md specs/emitir-dos-veces/spec.md
```

Rellénalo. La plantilla lleva las instrucciones dentro, pero lo que decide si
esto funciona es una sola sección: **Criterios de aceptación**.

La regla, para cada línea que escribas ahí:

> **¿Puedo escribir algo que compruebe esto sin mí?**

Si la respuesta es no, eso no es un criterio. Es una intención, y las
intenciones van en "Qué se quiere".

| Esto no vale | Esto sí |
|---|---|
| "Emitir dos veces no debería romper nada" | `pnpm test:unit -t "emitir dos veces devuelve 409"` |
| "El endpoint tiene que manejar bien el error" | `pnpm test:api -t "el segundo emitir devuelve ESTADO_INVALIDO"` |
| "No romper lo que ya funciona" | `pnpm test` |

**Los tests de los dos primeros todavía no existen.** Da igual: escribirlos es
parte del trabajo del Día 2. Lo que estás haciendo hoy es decidir, por
adelantado, qué comando va a demostrar que la tarea está hecha. El nombre del
test que pones en el `-t` es una promesa, y mañana alguien la tiene que cumplir.

Mira [`specs/ejemplo-emitir-factura/spec.md`](../specs/ejemplo-emitir-factura/spec.md)
si quieres ver la forma terminada.

No te olvides de **Alcance de modificación**: la lista de ficheros que se espera
tocar. El issue trae una sugerencia. Cópiala si te convence.

---

## Cuando termines

Tu spec está lista si puedes contestar que sí a las tres:

- [ ] Cada criterio de la tabla tiene un comando entre backticks.
- [ ] Ninguna línea de la tabla necesita que tú la leas para saber si pasó.
- [ ] La sección "Qué queda fuera" no está vacía. Si lo está, no has pensado bastante.

Eso es todo. Has escrito cuarenta líneas y no has abierto ningún fichero de
código.

**Mañana esas cuarenta líneas hacen el trabajo.** → [Día 2](dia-2.md)
