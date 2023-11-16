import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/FormField'
import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { RichEditor } from '@/components/RichEditor'
import { UploadCard } from '@/components/UploadCard'

export const DetailsPanel: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-agrandir text-2xl font-medium">Project details</h2>
      <div className="mt-3 text-gray-600">
        Add a detailed description, project links and disclaimer to help educate
        contributors about your project and it&apos;s goals.
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <FormField
          label="Campaign video"
          description={
            <>
              Add a video that describes your project. Tell people what
              you&apos;re raising funds to do, how you plan to make it happen,
              and why you care about this project.{' '}
              <Link href="#TODO">See example</Link>.
            </>
          }
        >
          <UploadCard />
        </FormField>
        <FormField label="Project description">
          <RichEditor />
        </FormField>

        <div className="grid grid-cols-2 gap-6">
          <FormField label="Website">
            <Input
              prefix="https://"
              prefixSeparator
              placeholder="www.juicebox.com"
            />
          </FormField>
          <FormField label="Twitter handle">
            <Input prefix="@" prefixSeparator placeholder="bannydao" />
          </FormField>
          <FormField label="Discord">
            <Input
              prefix="https://"
              prefixSeparator
              placeholder="www.juicebox.com"
            />
          </FormField>
          <FormField label="Telegram">
            <Input
              prefix="https://"
              prefixSeparator
              placeholder="www.juicebox.com"
            />
          </FormField>
        </div>
      </div>

      <Button className="mt-12 w-fit self-end">Next: Rewards</Button>
    </div>
  )
}
