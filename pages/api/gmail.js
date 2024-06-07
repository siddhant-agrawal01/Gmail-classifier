import { google } from 'googleapis'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  oAuth2Client.setCredentials({
    access_token: session.accessToken,
  })

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:instagram',
    })
    const messages = response.data.messages

    const emails = await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        })
        return email.data
      })
    )

    res.status(200).json(emails)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
