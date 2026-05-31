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
    ],
    jobTitle: 'Engineering Manager & Backend Engineer',
    description:
      'Engineering Manager & Backend Engineer specialising in Java, Spring Boot, PostgreSQL, and AWS.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
