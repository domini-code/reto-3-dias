# Día 2 · Implementar

**~20 minutos, y la mayoría son de esperar.**

Hoy el agente trabaja. Tú no vas a leer el diff — hoy ni siquiera al final.

---

## 1. Abre la rama (1 min)

```bash
git checkout -b fix/emitir-dos-veces
```

El nombre importa: el slug de la rama es el de la carpeta de la spec, y así
`pnpm veredicto` sin argumentos sabe qué contrato aplicar.

## 2. Dale el contrato al agente (2 min)

Sirve cualquier agente que lea ficheros del repo: Claude Code, Codex, Cursor,
Gemini CLI. Lo único que cambia es cómo se lanza.

Pégale esto tal cual:

```
Lee AGENTS.md y specs/emitir-dos-veces/spec.md. Son el contrato permanente
del repo y el contrato de esta tarea.

Implementa lo que pide la spec. Reglas:

- Solo los ficheros del alcance de modificación de la spec. Si necesitas
  salir de esa lista, para y dime por qué antes de tocar nada.
- Respeta los límites de AGENTS.md.
- No cambies los asserts de los tests que ya existen. Tests nuevos, sí.
- Cuando creas que has terminado, ejecuta el bucle corto de AGENTS.md
  y dime qué salió, sin arreglarlo por tu cuenta si falla algo que no
  esperabas.
```

Fíjate en lo que **no** lleva ese prompt: ninguna instrucción sobre cómo
resolverlo, ningún consejo de arquitectura, ninguna frase mágica. Todo lo que
necesita saber ya está escrito en dos ficheros, y esos dos ficheros los vuelves
a usar mañana y la semana que viene.

## 3. Espera (10-15 min)

Esta es la parte rara.

La tentación es mirar cómo escribe y corregirle a media frase. No lo hagas hoy.
El ejercicio entero consiste en comprobar qué pasa cuando el control no está en
tu lectura del diff, sino en el contrato y en lo que puede comprobarlo.

Si el agente para y pregunta por un límite, contéstale. Eso no es un fallo del
sistema: es el sistema.

## 4. Anótate una cosa (2 min)

Antes de cerrar, escribe en algún sitio —en la propia spec, en un post-it— la
respuesta a esto:

> **¿Cuánto rato has estado mirando código hoy?**

Mañana la vas a comparar con lo que tardas en leer el veredicto.

---

## Cuando termines

- [ ] El agente dice que ha terminado.
- [ ] Le has pedido el resultado del bucle corto y te lo ha dado.
- [ ] **No has leído el diff.** Si lo has leído, tampoco pasa nada: es el hábito de años. Pero anótalo.

**Mañana averiguas si tenía razón.** → [Día 3](dia-3.md)
