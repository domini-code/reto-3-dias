#!/usr/bin/env node
// El veredicto.
//
//   pnpm veredicto specs/<slug>/spec.md   ejecuta cada criterio de la spec
//   pnpm veredicto                        usa la spec de la rama actual
//
// Sale con código 1 si algún criterio falla. Esto es lo que lees en vez del diff.
//
// Versión del reto de 3 días. Comprueba los criterios de aceptación y nada más.
// Lo que NO mira está impreso al final de cada ejecución, a propósito.
import { spawnSync } from 'node:child_process'
import { relative } from 'node:path'
import { readSpec, normalizePath, currentBranch, activeSpecPath } from './lib/spec.mjs'

const args = process.argv.slice(2)
const specPath = args.find((arg) => !arg.startsWith('--') && arg.endsWith('.md')) ?? activeSpecPath()

if (!specPath) {
  console.error('')
  console.error('No encuentro la spec.')
  console.error('')
  console.error('  Pásala como argumento:  pnpm veredicto specs/<slug>/spec.md')
  console.error('  O nombra la rama como la carpeta de la spec: fix/emitir-dos-veces')
  console.error('')
  process.exit(2)
}

const spec = readSpec(specPath)
const branch = currentBranch() ?? '(sin git)'

const results = []
for (const criterion of spec.acceptanceCriteria) {
  if (!criterion.command) {
    results.push({ ...criterion, status: 'MANUAL', elapsedMs: 0, output: '' })
    continue
  }

  const startedAt = Date.now()
  const commandResult = spawnSync(criterion.command, { shell: true, encoding: 'utf8', stdio: 'pipe' })
  const elapsedMs = Date.now() - startedAt
  const combinedOutput = `${commandResult.stdout ?? ''}${commandResult.stderr ?? ''}`
  let output = combinedOutput.trim().split(/\r?\n/).slice(-12).join('\n')
  let status = commandResult.status === 0 ? 'PASA' : 'FALLA'

  // Vitest sale con 0 cuando un filtro -t no encuentra ningún test.
  // Eso no es un aprobado: es un examen que nadie corrigió.
  if (status === 'PASA' && /vitest|pnpm test/.test(criterion.command) && !/Tests\s+\d+\s+passed/.test(combinedOutput)) {
    status = 'FALLA'
    output = 'El comando no ejecutó ningún test: el filtro -t no encontró ningún nombre.'
  }

  results.push({ ...criterion, status, exitCode: commandResult.status, elapsedMs, output })
}

const formatSeconds = (milliseconds) => `${(milliseconds / 1000).toFixed(1)}s`
const pad = (value, width) => String(value).padEnd(width)

console.log('')
console.log(`VEREDICTO · ${spec.title}`)
console.log(`Spec: ${normalizePath(relative(process.cwd(), specPath))} · Rama: ${branch}`)
console.log('')

console.log('Criterios de aceptación')
if (results.length === 0) {
  console.log('  (la spec no tiene criterios con comando: no hay nada que comprobar)')
}
for (const result of results) {
  console.log(`  ${pad(result.number, 3)}${pad(result.status, 8)}${pad(formatSeconds(result.elapsedMs), 7)} ${result.criterion}`)
  if (result.status === 'FALLA') {
    console.log(`       ↳ ${result.command} (exit ${result.exitCode})`)
    for (const line of result.output.split('\n')) console.log(`         ${line}`)
  }
  if (result.status === 'MANUAL') console.log('       ↳ sin comando: este criterio lo tienes que mirar tú.')
}
console.log('')

const failed = results.filter((result) => result.status === 'FALLA').length
const manual = results.filter((result) => result.status === 'MANUAL').length
const passed = failed === 0

const summary = []
if (failed) summary.push(`${failed} criterio${failed > 1 ? 's' : ''} en rojo`)
if (manual) summary.push(`${manual} criterio${manual > 1 ? 's' : ''} manual${manual > 1 ? 'es' : ''}`)

console.log(`Resultado: ${passed ? 'PASA' : 'FALLA'}${summary.length ? ' · ' + summary.join(' · ') : ''}`)
console.log('')

// Lo que este veredicto no mira. Está aquí para que no lo confundas con el
// harness entero: un verificador que no dice dónde no llega es otra promesa
// sin comprobar, que es justo contra lo que va todo esto.
console.log('Esto no lo ha mirado nadie:')
console.log('  · el alcance — si el diff toca ficheros que la spec no pidió')
console.log('  · los asserts de los tests que ya existían — si se aflojaron para pasar')
console.log('  · la evidencia — qué comando demuestra cada criterio, pegado a la PR')
console.log('')
console.log('Los tres se automatizan. Aquí no están, y es la diferencia entre')
console.log('este ejercicio y un harness montado en tu repo.')
console.log('')

process.exit(passed ? 0 : 1)
