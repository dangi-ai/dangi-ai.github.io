#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT    = join(__dirname, '../src/data/repos.json')
const USERNAME  = 'dangi-ai'
const token     = process.env.GITHUB_TOKEN

async function fetchRepos() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  let page = 1
  const all = []

  while (true) {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&page=${page}`
    const res = await fetch(url, { headers })

    if (!res.ok) {
      console.error(`GitHub API ${res.status}: ${await res.text()}`)
      process.exit(1)
    }

    const batch = await res.json()
    if (batch.length === 0) break
    all.push(...batch)
    page++
    if (batch.length < 100) break
  }

  const filtered = all
    .filter(r => !r.fork && !r.archived)
    .map(r => ({
      id:               r.id,
      name:             r.name,
      full_name:        r.full_name,
      description:      r.description ?? null,
      html_url:         r.html_url,
      homepage:         r.homepage || null,
      language:         r.language ?? null,
      stargazers_count: r.stargazers_count,
      forks_count:      r.forks_count,
      topics:           r.topics ?? [],
      updated_at:       r.updated_at,
      fork:             r.fork,
      archived:         r.archived,
    }))

  mkdirSync(dirname(OUTPUT), { recursive: true })
  writeFileSync(OUTPUT, JSON.stringify(filtered, null, 2))
  console.log(`✓ Wrote ${filtered.length} repos to src/data/repos.json`)
}

fetchRepos().catch(err => {
  console.error('fetch-repos failed:', err.message)
  process.exit(1)
})
