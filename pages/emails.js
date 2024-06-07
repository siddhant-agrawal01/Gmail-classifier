import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Emails() {
  const { data: session } = useSession()
  const [emails, setEmails] = useState([])

  useEffect(() => {
    if (session) {
      axios.get('/api/emails').then(response => {
        setEmails(response.data)
      })
    }
  }, [session])

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to view your emails.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Classified Emails</h1>
      {emails.length === 0 && <p>No emails found.</p>}
      {emails.map((email, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h2 className="text-lg font-bold">Subject: {email.snippet}</h2>
          <p>Category: {email.category}</p>
        </div>
      ))}
    </div>
  )
}
