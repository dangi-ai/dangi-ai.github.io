import type { Metadata } from 'next'
import { RepoGrid } from '@/components/work/RepoGrid'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Open-source repositories and projects by Sushil Dangi.',
  openGraph: { url: 'https://luv2code.in/work/' },
}

export default function WorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
        Work
      </h1>
      <p className="text-[var(--text-secondary)] mb-12">
        Public repositories — filter, sort, and explore.
      </p>
      <RepoGrid repos={repos as Repo[]} />
    </div>
  )
}
