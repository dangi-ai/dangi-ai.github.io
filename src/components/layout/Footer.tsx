const SOCIALS = [
  { href: 'https://github.com/dangi-ai',                 label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sushil-dangi/',   label: 'LinkedIn' },
  { href: 'https://x.com/s_dangi98',                     label: 'X' },
  { href: 'https://www.instagram.com/smiley_s_d/',       label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="page py-8 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
        <p className="tracked text-faint text-[0.62rem]">
          luv2code · Sushil Dangi · Bengaluru · {new Date().getFullYear()}
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
          {SOCIALS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="tracked text-[0.62rem] text-faint hover:text-paper transition-colors duration-500 ease-soft"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
