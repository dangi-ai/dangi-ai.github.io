import type { Metadata } from 'next'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'
import { RepoGrid } from '@/components/work/RepoGrid'
import { PageHeader } from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Open source repositories by Sushil Dangi — Java, Spring Boot, backend tools.',
  openGraph: { url: 'https://luv2code.in/work' },
}

export default function WorkPage() {
  return (
    <div className="page pb-[var(--gutter-block)]">
      <PageHeader
        eyebrow="Work"
        title={['Open source', <em key="repos">repositories.</em>]}
        lead="Everything here is fetched from GitHub at build time — starters, experiments, and the libraries I reach for on real projects."
      />
      <RepoGrid repos={repos as Repo[]} />
    </div>
  )
}
