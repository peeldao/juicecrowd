import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { PropsWithChildren, useCallback, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '../Input'
import { Navbar } from '../layout/Navbar'
import { Textarea } from '../ui/Textarea'
import { useToast } from '../ui/useToast'
import { LoadingButton } from '../LoadingButton'

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
  const [state, dispatch] = useReducer(submitReducer, {
    loading: false,
    error: null,
  })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      dispatch({ type: 'submit' })
      try {
        await axios.post('/api/contact', values)
        form.reset()
        dispatch({ type: 'success' })
        toast({
          title: 'Message sent',
          description: 'We will get back to you as soon as possible.',
        })
      } catch (e: any) {
        dispatch({ type: 'error', error: e.message })
        toast({
          title: 'Error',
          description: e.message,
          variant: 'destructive',
        })
      }
    },
    [form, toast],
  )

  return (
    <>
      <Navbar />
      <div className="mx-auto mb-56 flex max-w-xl flex-col items-center px-5 pt-14 text-base md:pt-20">
        <h1 className="font-medium text-bluebs-600">Contact us</h1>
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

            <LoadingButton
              className="mt-8 w-full"
              loading={state.loading}
              type="submit"
            >
              Send message
            </LoadingButton>
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

type submitReducerState = {
  loading: boolean
  error: string | null
}

type submitReducerAction =
  | { type: 'submit' }
  | { type: 'success' }
  | { type: 'error'; error: string }

function submitReducer(
  state: submitReducerState,
  action: submitReducerAction,
): submitReducerState {
  switch (action.type) {
    case 'submit':
      return { loading: true, error: null }
    case 'success':
      return { loading: false, error: null }
    case 'error':
      return { loading: false, error: action.error }
    default:
      return state
  }
}
