import axios from 'axios'

const url = process.env.CONTACT_WEBHOOK_URL
const requestRoleId = process.env.DISCORD_REQUEST_ROLE_ID

export type createContactMessageParams = {
  name: string
  email: string
  subject: string
  message: string
}
export const createContactMessage = ({
  name,
  email,
  subject,
  message,
}: createContactMessageParams) => {
  const body = {
    content: requestRoleId ? `<@&${requestRoleId}>` : '', // Tags "requests" role
    embeds: [
      {
        title: 'New message from juicecrowd.gg',
        description: `At <t:${Math.floor(Date.now() / 1000)}:R>`,
        color: 16098066,
        fields: [
          {
            name: 'Name',
            value: name ? name : 'No name provided',
            inline: false,
          },
          {
            name: 'Email',
            value: email ? email : 'No email provided',
            inline: true,
          },
          {
            name: 'Subject',
            value: subject ? subject : 'No subject provided',
            inline: false,
          },
          {
            name: 'Message',
            value: message ? message : 'No message provided',
            inline: false,
          },
        ],
      },
    ],
  }

  if (!url) {
    console.error(
      'Missing CONTACT_WEBHOOK_URL .env var required to send Discord alert: ',
      JSON.stringify(body),
    )
    throw new Error('Could not find CONTACT_WEBHOOK_URL .env var.')
  }

  return axios.post(url, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
