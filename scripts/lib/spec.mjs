// Lee el contrato de una tarea desde specs/<slug>/spec.md.
//
// Lo usa scripts/veredicto.mjs. Sin dependencias: solo Node.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

/** Devuelve el contenido de una sección `## Título` hasta el siguiente `## `. */
export function getSection(markdown, title) {
  const lines = markdown.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${title}`.toLowerCase())
  if (start === -1) return null
  const body = []
  for (const line of lines.slice(start + 1)) {
    if (/^## /.test(line)) break
    body.push(line)
  }
  return body.join('\n')
}

/**
 * Parsea las filas de la tabla de criterios de aceptación.
 *
 * Cada fila es `| n | criterio | \`comando\` |`. Un criterio sin comando entre
 * backticks se marca MANUAL: no es que no cuente, es que lo tienes que mirar tú,
 * que es exactamente lo que el contrato existe para reducir.
 */
export function acceptanceCriteria(markdown) {
  const text = getSection(markdown, 'Criterios de aceptación')
  if (!text) return []
  const rows = []
  for (const line of text.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim())
    if (cells.length < 3) continue
    const number = Number(cells[0])
    if (!Number.isInteger(number)) continue
    const command = cells[2].match(/`([^`]+)`/)?.[1] ?? null
    rows.push({ number, criterion: cells[1], command })
  }
  return rows
}

export function normalizePath(path) {
  return path.replace(/\\/g, '/').replace(/^\.\//, '')
}

/** Rama actual, o null fuera de un repositorio Git. */
export function currentBranch(cwd = process.cwd()) {
  try {
    return execSync('git branch --show-current', { cwd, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    return null
  }
}

/** Resuelve la spec activa desde la rama actual o desde la variable SPEC. */
export function activeSpecPath(cwd = process.cwd()) {
  if (process.env.SPEC) return process.env.SPEC
  const branch = currentBranch(cwd)
  if (!branch) return null
  const slug = branch.split('/').pop()
  const candidate = join(cwd, 'specs', slug, 'spec.md')
  return existsSync(candidate) ? candidate : null
}

export function readSpec(path) {
  const markdown = readFileSync(path, 'utf8')
  return {
    path,
    markdown,
    title: markdown.match(/^#\s+(.+)$/m)?.[1] ?? path,
    acceptanceCriteria: acceptanceCriteria(markdown),
  }
}
