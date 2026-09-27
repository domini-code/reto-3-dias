# Spec: emitir una factura

> **Este es un ejemplo resuelto, no parte del reto.**
>
> La feature que describe ya está implementada en el repo. Está aquí por dos
> razones: para que veas la forma de un contrato terminado antes de escribir el
> tuyo, y para que compruebes que el veredicto funciona en tu máquina:
>
> ```bash
> pnpm veredicto specs/ejemplo-emitir-factura/spec.md
> ```
>
> Tiene que salir todo en verde. Si no, el problema es tu instalación y no tu
> trabajo — arréglalo antes del Día 1.

**Issue:** — (feature original del repo)
**Fecha:** 2026-09-12
**Estado:** cerrada

## Qué se quiere

Una factura en borrador se emite con `POST /facturas/:id/emitir`. Al emitirse
recibe un número correlativo por año (`F-2026-0001`) y una fecha de emisión, y
pasa al estado `ISSUED`.

## Qué queda fuera

- Anular una factura ya emitida (issue 01).
- Registrar pagos (fuera de este reto).
- Emitir dos veces la misma factura: hoy el sistema lo permite y **eso es el
  issue 06**, que es el que vas a especificar tú.

## Criterios de aceptación

Cada criterio lleva el comando que lo demuestra. Un criterio sin comando es una
opinión, y las opiniones se revisan a mano, que es justo lo que queremos evitar.

| # | Criterio | Cómo se verifica |
|---|---|---|
| 1 | Emitir un borrador lo pasa a `ISSUED` y le asigna número correlativo por año | `pnpm test:unit -t "pasa a ISSUED y asigna número correlativo por año"` |
| 2 | La numeración se reinicia cada año | `pnpm test:unit -t "reinicia la numeración cada año"` |
| 3 | La ruta devuelve el número asignado | `pnpm test:api -t "emite el borrador y devuelve el número asignado"` |
| 4 | La suite existente sigue en verde sin tocar sus asserts | `pnpm test` |
| 5 | Tipos y lint sin excepciones nuevas | `pnpm typecheck && pnpm lint` |

## Alcance de modificación

- `src/services/invoices.ts`
- `src/routes/invoices.ts`
- `src/services/invoices.test.ts`
- `src/routes/invoices.test.ts`

## Riesgos

La numeración correlativa se calcula contando las facturas emitidas del año. Si
dos peticiones emiten a la vez, pueden pedir el mismo número. Ningún comando del
harness lo detecta: es un hueco conocido, y en un repo de verdad esa frase se
escribe aquí y se convierte en el siguiente issue.
