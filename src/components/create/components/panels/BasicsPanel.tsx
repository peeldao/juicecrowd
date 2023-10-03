import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { Input } from '@/components/Input'
import { UploadCard } from '@/components/UploadCard'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export const BasicsPanel: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-agrandir text-2xl font-medium">Basic information</h2>
      <div className="mt-3 text-gray-600">
        Add basic information about your project, these details can be edited
        later.
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <FormField label="Project name" required>
          <Input placeholder="Bannyverse" />
        </FormField>
        <FormField
          label="Tagline"
          description="A short one sentence description of your project."
        >
          <Input placeholder="Enter the bannyverse" />
        </FormField>
        <div className="flex gap-5">
          <FormField className="max-w-[33%]" label="Logo" required>
            <UploadCard recommendedSize={{ width: 500, height: 500 }} />
          </FormField>
          <FormField className="flex-1" label="Cover photo">
            <UploadCard
              className="flex-1"
              recommendedSize={{ width: 1400, height: 256 }}
            />
          </FormField>
        </div>
        <FormField
          label="Email address"
          description="Add email to receive updates from your project."
        >
          <Input
            prefix={<EnvelopeIcon className="h-5 w-5" />}
            placeholder="banny@juicebox.com"
          />
        </FormField>
      </div>
      <Button className="mt-12 w-fit self-end">Next: Funding</Button>
    </div>
  )
}
