import { useEffect } from "react"

declare global {
  var dataLayer: IArguments[]
  function gtag(key: string, ...args: unknown[]): void
}

export function setupGtag() {
  useEffect(() => {
    window.dataLayer ??= []
    window.gtag ??= function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-FZ6PQCTQ5B')
  }, [])
}
