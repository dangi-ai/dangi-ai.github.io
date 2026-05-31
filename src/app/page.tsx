import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StatsStrip } from '@/components/home/StatsStrip'
import { TechStrip } from '@/components/home/TechStrip'
import { FeaturedRepos } from '@/components/home/FeaturedRepos'
import { JsonLd } from '@/components/JsonLd'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Luv2code — Sushil Dangi',
  description:
    'Senior Java / Spring Boot Lead · 10+ years building distributed systems. I luv 2 code. I luv 2 share what I learn.',
  openGraph: { url: 'https://luv2code.in/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <StatsStrip />
      <TechStrip />
      <FeaturedRepos repos={repos as Repo[]} />
    </>
  )
}
