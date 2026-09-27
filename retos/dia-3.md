# Día 3 · Verificar

**~25 minutos. Hoy es el día.**

---

## 1. Dicta el veredicto (2 min)

```bash
pnpm veredicto specs/emitir-dos-veces/spec.md
```

Una tabla. Un `PASA` o un `FALLA` por criterio, con el comando que lo demuestra
y cuánto tardó.

Léela entera antes de abrir ningún fichero.

**Si sale rojo**, no arregles nada tú todavía. Cópiale al agente la salida del
veredicto, tal cual, y nada más:

```
Este es el veredicto de tu trabajo contra el contrato. Arregla lo que falla,
dentro del alcance de la spec y sin tocar los asserts de los tests que ya
existían.

[pega aquí la salida]
```

Eso es el bucle entero: el fallo llega con nombre, temprano y barato, en vez de
anónimo, tarde y a tu costa. Repítelo hasta verde. Suele ser una vez.

## 2. Lee el contrato, no la implementación (5 min)

Con el veredicto en verde, abre tu spec de nuevo. Cuarenta líneas.

Y hazte la pregunta que solo puedes contestar tú, que ya no es *"¿está bien este
código?"* sino:

> **¿Pedí lo correcto?**

Ahora sí, abre el diff. Pero no a buscar bugs — a mirar las zonas donde el
contrato no llega: si los nombres encajan con el dominio, si la solución es la
adecuada para este proyecto, si hay algo que ninguna comprobación automática iba
a detectar.

Compara el rato que te ha llevado con lo que te anotaste ayer.

## 3. Rompe el carril a propósito (5 min)

Esta es la parte que no se transmite leyendo, así que hazla de verdad.

Abre `src/services/invoices.test.ts`, busca un `expect(...)` de un test que ya
existía —uno que **no** hayas escrito tú estos días— y aflójalo. Cambia un valor
esperado por otro. Diez segundos.

Ahora:

```bash
pnpm veredicto specs/emitir-dos-veces/spec.md
```

Rojo, en el criterio de la suite existente, con el nombre del test que rompiste.

Eso es lo que pasa cuando alguien —tú, un agente, alguien con prisa un viernes—
afloja el examen para que el trabajo pase. Con un harness delante, se ve. Sin
él, se mergea.

Deshazlo:

```bash
git checkout src/services/invoices.test.ts
```

## 4. Mira el final de la salida (3 min)

Debajo del resultado, cada veredicto imprime tres líneas:

```
Esto no lo ha mirado nadie:
  · el alcance — si el diff toca ficheros que la spec no pidió
  · los asserts de los tests que ya existían — si se aflojaron para pasar
  · la evidencia — qué comando demuestra cada criterio, pegado a la PR
```

El punto dos lo acabas de descubrir a mano, y funcionó porque el criterio 4 de
tu spec ejecuta la suite entera. Los otros dos no los mira nadie en este repo.

Los tres se automatizan.

---

## Lo que has hecho en tres días

Cogiste un issue. Escribiste un contrato que algo que no eres tú puede rechazar.
Un agente lo ejecutó. Y leíste un veredicto en vez de cuatrocientas líneas.

Eso es el mecanismo entero: **contrato, carril, veredicto**.

## Lo que no has hecho

Lo montaste en un repo de juguete que ya venía preparado. El `AGENTS.md` estaba
escrito, el harness existía, los tests tardan dos segundos y el proyecto entero
cabe en una pantalla.

Tu repo no se parece a esto. Tu repo tiene un monorepo, una suite de doce
minutos, tres servicios que se llaman entre sí y un CI que alguien montó en 2022
y nadie ha tocado desde entonces.

Montarlo ahí es otra cosa, y es la que se cobra:

👉 **[workshop.dominicode.com](https://workshop.dominicode.com)**

---

## Si quieres seguir practicando

Quedan dos issues en [`issues/`](../issues). El [01](../issues/01-anular-factura.md)
es una feature en vez de un bug. El [05](../issues/05-precio-un-decimal.md) toca
`src/lib/money.ts`, que está en los límites del `AGENTS.md`: la spec tiene que
autorizarlo explícitamente y decir por qué.

Ese segundo es el interesante. Es donde se aprende que un límite no es un muro,
es una firma.
