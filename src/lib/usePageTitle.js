import { useEffect } from 'react'

const DEFAULT_TITLE = 'Paliwal Machinery — Grain Processing Machinery & Industrial Solutions, Bilaspur'
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Paliwal Machinery` : DEFAULT_TITLE
  }, [title])
}
