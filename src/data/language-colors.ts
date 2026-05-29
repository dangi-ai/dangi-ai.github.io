export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript:  '#F7DF1E',
  TypeScript:  '#3178C6',
  Python:      '#3572A5',
  Java:        '#B07219',
  Kotlin:      '#A97BFF',
  Go:          '#00ADD8',
  Rust:        '#DEA584',
  'C++':       '#F34B7D',
  C:           '#555555',
  'C#':        '#178600',
  Ruby:        '#701516',
  PHP:         '#4F5D95',
  Swift:       '#F05138',
  HTML:        '#E34C26',
  CSS:         '#563D7C',
  SCSS:        '#C6538C',
  Shell:       '#89E051',
  Dockerfile:  '#384D54',
  Vue:         '#41B883',
  Svelte:      '#FF3E00',
  Dart:        '#00B4AB',
  Scala:       '#C22D40',
  Elixir:      '#6E4A7E',
  Haskell:     '#5E5086',
  Clojure:     '#DB5855',
  R:           '#276DC3',
}

export function getLanguageColor(language: string | null): string {
  if (!language) return '#8B949E'
  return LANGUAGE_COLORS[language] ?? '#8B949E'
}
