import type { Metadata } from 'next'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'
import { RepoGrid } from '@/components/work/RepoGrid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Open source repositories by Sushil Dangi — Java, Spring Boot, backend tools.',
  openGraph: { url: 'https://luv2code.in/work' },
}

export default function WorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">Work</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-10">
        Open source repos
      </h1>
      <RepoGrid repos={repos as Repo[]} />
    </div>
  )
}
