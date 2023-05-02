interface Props {
  errorMessage: string
}

export function ErrorView({ errorMessage }: Props) {
  return <p className="mt-8 flex items-center justify-center">{errorMessage}</p>
}
