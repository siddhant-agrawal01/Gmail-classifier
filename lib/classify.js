// import axios from 'axios'

// export async function classifyEmails(emails) {
//   const openaiApiKey = process.env.OPENAI_API_KEY
//   const classifiedEmails = []

//   for (const email of emails) {
//     const content = email.snippet

//     const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
//       prompt: `Classify this email content into one of the following categories: Important, Promotional, Social, Marketing, Spam, General.\n\n${content}\n\nCategory:`,
//       max_tokens: 1,
//       temperature: 0.7,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${openaiApiKey}`,
//         'Content-Type': 'application/json',
//       },
//     })

//     const category = response.data.choices[0].text.trim()
//     classifiedEmails.push({ ...email, category })
//   }

//   return classifiedEmails
// }

import axios from 'axios'

export async function classifyEmails(emails) {
  const openaiApiKey = process.env.OPENAI_API_KEY
  const classifiedEmails = []

  for (const email of emails) {
    const content = email.snippet

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Classify this email content into one of the following categories: Important, Promotional, Social, Marketing, Spam, General.\n\n${content}\n\nCategory:`,
      max_tokens: 1,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const category = response.data.choices[0].text.trim()
    classifiedEmails.push({ ...email, category })
  }

  return classifiedEmails
}
