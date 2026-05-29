export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sushil Dangi',
    url: 'https://luv2code.in',
    sameAs: [
      'https://github.com/dangi-ai',
      'https://www.linkedin.com/in/sushil-dangi/',
      'https://x.com/s_dangi98',
      'https://www.instagram.com/smiley_s_d/',
    ],
    jobTitle: 'Engineering Manager & Backend Engineer',
    description: 'I luv 2 code. I luv 2 share what I learn.',
    knowsAbout: ['Java', 'Spring Boot', 'PostgreSQL', 'GitHub Actions', 'AWS'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
