import { classifyEmails } from '../../../lib/classify'

export default async function handler(req, res) {
  const { emails } = req.body

  try {
    const classifiedEmails = await classifyEmails(emails)
    res.status(200).json(classifiedEmails)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
