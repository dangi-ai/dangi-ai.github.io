import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { TechStrip } from '@/components/home/TechStrip'
import { FeaturedRepos } from '@/components/home/FeaturedRepos'
import { JsonLd } from '@/components/JsonLd'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Luv2code — Sushil Dangi',
  description:
    'Engineering Manager & Backend Engineer. Java · Spring Boot · AWS. I luv 2 code.',
  openGraph: { url: 'https://luv2code.in/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <TechStrip />
      <FeaturedRepos repos={repos as Repo[]} />
    </>
  )
}
