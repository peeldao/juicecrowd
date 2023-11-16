import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/FormField'
import { Input } from '@/components/Input'
import { InfoCallout } from '@/components/callouts'

export const FundingPanel: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-agrandir text-2xl font-medium">Funding</h2>
      <div className="mt-3 text-gray-600">
        Set a funding target and duration for your campaign, if the campaign is
        successful, all funds will go to the project owner.
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <FormField label="Funding target">
          <Input placeholder="$0" />
        </FormField>
        <FormField
          label="Project duration"
          description="A short one sentence description of your project."
        >
          <Input placeholder="Enter the bannyverse" />
        </FormField>
        <InfoCallout>
          If the funding target isn&apos;t reached by the end of the campaign,
          all funds will be returned to contributors.
        </InfoCallout>
      </div>

      <Button className="mt-12 w-fit self-end">Next: Details</Button>
    </div>
  )
}
