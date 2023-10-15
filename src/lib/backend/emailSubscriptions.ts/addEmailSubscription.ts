import { google } from 'googleapis'

const GOOGLE_SHEET_ID = '1_OpoitLq1pLQIqsdDGh6SbRrdtmABXdIXuJD6HMAVCo'

/**
 * Append an email address to the Google sheet which lists email subscriptions for JuiceCrowd
 * @param emailAddress
 */
export async function addEmailSubscription(emailAddress: string) {
  const GoogleSheetsServiceAccountRaw =
    process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT
  if (!GoogleSheetsServiceAccountRaw) {
    throw new Error('GOOGLE_SHEETS_SERVICE_ACCOUNT is not set in .env')
  }
  const GoogleSheetsServiceAccount = JSON.parse(
    GoogleSheetsServiceAccountRaw,
  ) as {
    client_email: string
    private_key: string
  }

  const jwtClient = new google.auth.JWT(
    GoogleSheetsServiceAccount.client_email,
    undefined,
    GoogleSheetsServiceAccount.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
  )

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
