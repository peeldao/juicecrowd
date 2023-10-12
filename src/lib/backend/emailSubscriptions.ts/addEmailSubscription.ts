import { google } from 'googleapis'

if (!process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT) {
  throw new Error('GOOGLE_SHEETS_SERVICE_ACCOUNT is not set in .env');
}

const GOOGLE_SHEETS_SERVICE_ACCOUNT = JSON.parse(
  process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT ?? '',
)
const GOOGLE_SHEET_ID = '1_OpoitLq1pLQIqsdDGh6SbRrdtmABXdIXuJD6HMAVCo'

const jwtClient = new google.auth.JWT(
  GOOGLE_SHEETS_SERVICE_ACCOUNT.client_email,
  undefined,
  GOOGLE_SHEETS_SERVICE_ACCOUNT.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
)
/**
 * Append an email address to the Google sheet which lists email subscriptions for JuiceCrowd
 * @param emailAddress
 */
export async function addEmailSubscription(emailAddress: string) {
  return new Promise<void>((resolve, reject) => {
    jwtClient.authorize(async err => {
      if (err) {
        console.error('Google Auth Error:', err)
        reject(new Error('Google Auth Error'))
        return
      }

      const sheetsApi = google.sheets({ version: 'v4', auth: jwtClient })

      const response = await sheetsApi.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Sheet1!A:A',
      })

      const existingEmails = response.data.values?.flat() || []

      // Ensure email is not already added
      if (existingEmails.includes(emailAddress)) {
        reject(new Error('Email already exists'))
        return
      }

      const nextRow = existingEmails.length + 1
      const range = `Sheet1!A${nextRow}`

      try {
        await sheetsApi.spreadsheets.values.append({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: range,
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [[emailAddress]],
          },
        })
        resolve()
      } catch (e) {
        console.error('Failed to append email', e)
        reject(new Error('Failed to append email'))
      }
    })
  })
}
