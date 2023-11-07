export const twitterShare = (text: string, url: string) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`
  window.open(twitterUrl, '_blank')
}
