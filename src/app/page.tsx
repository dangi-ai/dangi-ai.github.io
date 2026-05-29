import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { TechStack } from '@/components/home/TechStack'
import { FeaturedRepos } from '@/components/home/FeaturedRepos'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Luv2code — Sushil Dangi',
  description: 'Engineering Manager & Backend Engineer. I luv 2 code. I luv 2 share what I learn.',
  openGraph: { url: 'https://luv2code.in/', title: 'Luv2code — Sushil Dangi' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <FeaturedRepos repos={repos as Repo[]} />
    </>
  )
}
