import { JuiceCrowdError } from '@/lib/error'
import { google } from 'googleapis'

export type AddRowToGoogleSheetParams = {
  row: string | string[]
  sheetId: string
  sheetNumber: number
  unique?: boolean
}

/**
 * Add a row to a google sheet.
 *
 * @param row The row to add. Can be a string or an array of strings.
 * @param sheetId The ID of the google sheet to add the row to.
 * @param unique If true, will throw an error if the row already exists.
 */
export const addRowToGoogleSheet = async ({
  row,
  sheetId,
  sheetNumber,
  unique = false,
}: AddRowToGoogleSheetParams) => {
  if (sheetNumber < 1) {
    throw new Error('Sheet number must be greater than 0')
  }
  const jwtClient = getGoogleJWTClient()

  try {
    await jwtClient.authorize()
  } catch (e) {
    console.error('Google Auth Error:', e)
    throw new Error('Google Auth Error')
  }

  const sheetsApi = google.sheets({ version: 'v4', auth: jwtClient })

  const existingRowsRes = await sheetsApi.spreadsheets.values.get({
    spreadsheetId: sheetId,
    // Get all rows and cols
    range: `Sheet${sheetNumber}!A:Z`,
  })
  const existingRows = existingRowsRes.data.values || []

  if (unique) {
    if (typeof row === 'string') {
      if (existingRows.flat().includes(row)) {
        throw new JuiceCrowdError('Row already exists', 409)
      }
    } else {
      if (existingRows.includes(row)) {
        throw new JuiceCrowdError('Row already exists', 409)
      }
    }
  }

  const nextRow = existingRows.length + 1
  const range = `Sheet${sheetNumber}!A${nextRow}`

  try {
    const values = typeof row === 'string' ? [[row]] : [row]
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    })
  } catch (e) {
    console.error('Failed to append row', e)
    throw new Error('Failed to append row')
  }
}

const getGoogleJWTClient = () => {
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

  return jwtClient
}
