import Autolinker from 'autolinker'
import { twMerge } from 'tailwind-merge'
import { useProcessedRichNote } from './hooks'
import Image from 'next/image'

type RichNoteProps = {
  className?: string
  note: string | undefined
  ignoreMediaLinks?: boolean
}

export function RichNote({
  className,
  note,
  ignoreMediaLinks,
  children,
}: React.PropsWithChildren<RichNoteProps>) {
  const { trimmedNote, formattedMediaLinks } = useProcessedRichNote(note)

  const noteToRender = ignoreMediaLinks ? note : trimmedNote

  if (noteToRender === undefined) return null

  return (
    <div className={twMerge('mt-1', className)}>
      {noteToRender.length ? (
        <span
          className="break-words pr-2"
          dangerouslySetInnerHTML={{
            __html: Autolinker.link(noteToRender, {
              sanitizeHtml: true,
              truncate: {
                length: 30,
                location: 'smart',
              },
            }).replaceAll('\n', '<br>'),
          }}
        ></span>
      ) : null}

      {children}

      {!ignoreMediaLinks && formattedMediaLinks?.length ? (
        <div className="mt-2 flex flex-wrap gap-x-4 rounded-lg">
          {formattedMediaLinks.map((link, i) => (
            <Image
              className="rounded-lg"
              key={i}
              src={link}
              alt="User uploaded image"
              width={96}
              height={96}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
