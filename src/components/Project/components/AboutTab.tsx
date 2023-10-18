import { twMerge } from 'tailwind-merge'
import { SocialLinkButton } from './SocialLinkButton'

export type AboutTabProps = {
  className?: string
}

export const AboutTab: React.FC<AboutTabProps> = ({ className }) => {
  return (
    <>
      <div className="flex gap-10">
        {/* // TODO: Real data */}
        <SocialLinkButton type="twitter" href="https://example.com" />
        <SocialLinkButton type="discord" href="https://example.com" />
        <SocialLinkButton type="website" href="https://example.com" />
        <SocialLinkButton type="telegram" href="https://example.com" />
      </div>
      <div className="mt-10">
        <h3 className="font-heading text-2xl font-medium">
          About the Documentary
        </h3>
        <div className="mt-5 space-y-6 text-base">
          <p>
            On July 1, 2023, Australia became the first country in the world to
            recognise psychedelics as medicines. Like many of you, I believe
            that these treatments offer a promising new avenue to address the
            mental health crisis - at a time when we need it the most. Rather
            than re-tell the story of psychedelics' complicated history; this
            documentary looks forward.
          </p>
          <p>
            How will these treatments roll out? Who can access them? How much
            will it cost? Are the results as good as they say?
          </p>
          <p>
            I've spent 6 months speaking to researchers, practitioners, doctors,
            patients and pharmaceutical companies, to understand the impact
            these new treatments can have on rising rates of anxiety,
            depression, eating disorders and suicide.
          </p>
          <div className={twMerge('h-96 w-full rounded-lg bg-orange-200')} />
          <p>
            For 10 years I've wanted to make a documentary that can have a
            significant impact on the world. I truly believe this is an
            important story that needs to be told. But the question is - is
            giving psychedelics to people with severe mental illness the best
            way to study these compounds?
          </p>
          <h4 className="font-heading text-xl font-medium">A Paradigm Shift</h4>
          <p>
            A Trip to Transformation explores a paradigm shift beyond treating
            illness. What role can psychedelics play to improve well-being, and
            to address moderate mental challenges?
          </p>
          <p>
            The broader application of these treatments offers a pathway to
            improve more lives, and to transform the health and wellness of
            society.
          </p>
          <p>
            This documentary will explore the big questions that surround their
            integration into mainstream healthcare, and the hope, apprehension,
            and controversies that encompass the rollout of these new
            treatments.
          </p>
        </div>
      </div>
    </>
  )
}
