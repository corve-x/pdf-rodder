import { Link } from 'react-router-dom'

/** Flat red document mark + wordmark. */
export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 rounded-control" aria-label="PDF Rodder home">
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#C0392B" />
        <path
          d="M10 6h8l6 6v14a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M18 6v6h6"
          fill="none"
          stroke="#EDEDED"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-base font-bold tracking-wide text-text">PDF RODDER</span>
    </Link>
  )
}
