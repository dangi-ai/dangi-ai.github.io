const colors: Record<string, string> = {
  Java:         '#b07219',
  TypeScript:   '#3178c6',
  JavaScript:   '#f1e05a',
  Python:       '#3572A5',
  Go:           '#00ADD8',
  Rust:         '#dea584',
  Kotlin:       '#A97BFF',
  SQL:          '#e38c00',
  Shell:        '#89e051',
  YAML:         '#cb171e',
  Dockerfile:   '#384d54',
  HTML:         '#e34c26',
  CSS:          '#563d7c',
}

export function getLanguageColor(language: string | null): string {
  if (!language) return '#8b949e'
  return colors[language] ?? '#8b949e'
}
