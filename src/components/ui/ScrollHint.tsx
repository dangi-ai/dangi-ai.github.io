// "Scroll" label + 1px track with a travelling beam + chevron
// (reference: .op-hint). Keyframes live in globals.css.
export function ScrollHint({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex-col items-center gap-4 ${className.includes('hidden') ? '' : 'flex '}${className}`.trim()}>
      <span className="hint-label eyebrow eyebrow-wide text-paper pl-[0.42em]">Scroll</span>
      <span className="hint-track">
        <span className="hint-beam" />
      </span>
      <svg viewBox="0 0 24 14" width="18" height="10" className="text-paper/70">
        <path d="M2 2 L12 11 L22 2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  )
}
