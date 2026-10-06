interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h1>
      {description && <p className="mt-2 max-w-xl text-base leading-relaxed text-text-secondary">{description}</p>}
    </div>
  )
}
