import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns an array of tailwind CSS classes for setting the height and width of an element based on its text size.
 * @param className - A string containing one or more tailwind CSS classes.
 * @returns An array of tailwind CSS classes for setting the height and width of an element based on its text size.
 */
export function cnTextHw(className: string | undefined) {
  if (!className) return []
  return [
    className.includes('text-2xl') && 'h-6 w-6',
    className.includes('text-xl') && 'h-5 w-5',
    className.includes('text-lg') && 'h-[18px] w-[18px]',
    className.includes('text-base') && 'h-4 w-4',
    className.includes('text-sm') && 'h-3.5 w-3.5',
    className.includes('text-xs') && 'h-3 w-3',
  ]
}

/**
 * Removes headers and HTML tags from a string for use in e.g. meta og:description tags.
 * @param description - The description to sanitize.
 * @returns The sanitized description.
 */
export function sanitizeDescriptionContent(description: string) {
  // If there are no HTML tags, return the text as-is.
  const containsHtml = /<[^>]*>?/m.test(description)
  if (!containsHtml) return description

  // Remove headers and text within them. Headers don't make sense in descriptions.
  const headerRegex = /<h[1-3]>(.*?)<\/h[1-3]>/g
  let headerMatch
  while ((headerMatch = headerRegex.exec(description)) !== null) {
    description = description.replace(headerMatch[0], '')
  }

  // Remove all HTML tags from the description.
  description = description.replace(/<[^>]*>?/gm, '')

  return description
}
