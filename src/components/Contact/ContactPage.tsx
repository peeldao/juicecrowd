import { useForm } from 'react-hook-form'
import { Navbar } from '../layout/Navbar'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PropsWithChildren, use, useCallback } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '../Input'
import { Button } from '../Button'
import { Textarea } from '../ui/Textarea'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(50, 'Subject must be less than 50 characters'),
  message: z
    .string()
    .min(2, 'Message must be at least 2 characters')
    .max(500, 'Message must be less than 500 characters'),
})

export type ContactPageProps = {
  className?: string
}

export const ContactPage: React.FC<ContactPageProps> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log(values)
  }, [])

  return (
    <>
      <Navbar />
      <div className="mx-auto mb-56 flex max-w-xl flex-col items-center px-5 pt-14 text-base md:pt-20">
        <h1 className="font-medium text-blue-600">Contact us</h1>
        <h1 className="mt-3 font-heading text-5xl font-bold">Get in touch</h1>
        <div className="mt-6 text-center">
          Got a question or need help with your project? Fill out the form below
          and we&apos;ll get back to you as soon as possible.
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 w-full md:mt-14"
          >
            <div className="space-y-6 md:space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <ContactFormItem label="Your name">
                    <Input placeholder="First name" {...field} />
                  </ContactFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <ContactFormItem label="Email">
                    <Input placeholder="you@company.com" {...field} />
                  </ContactFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <ContactFormItem label="Subject">
                    <Input placeholder="Project submission" {...field} />
                  </ContactFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <ContactFormItem label="Message">
                    <Textarea placeholder="Leave us a message..." {...field} />
                  </ContactFormItem>
                )}
              />
            </div>

            <Button className="mt-8 w-full" type="submit">
              Send message
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

type ContactFormItemProps = {
  className?: string
  label: string
  description?: string
}

const ContactFormItem: React.FC<PropsWithChildren<ContactFormItemProps>> = ({
  className,
  label,
  description,
  children,
}) => {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
