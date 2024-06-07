// import { useSession, signIn, signOut } from 'next-auth/react'
// import { useState } from 'react'
// import axios from 'axios'

// export default function Home() {
//   const { data: session } = useSession()
//   const [emails, setEmails] = useState([])

//   const fetchEmails = async () => {
//     try {
//       const response = await axios.get('/api/emails/fetch')
//       setEmails(response.data)
//     } catch (error) {
//       console.error('Error fetching emails:', error)
//     }
//   }

//   const classifyEmails = async () => {
//     try {
//       const response = await axios.post('/api/emails/classify', { emails })
//       setEmails(response.data)
//     } catch (error) {
//       console.error('Error classifying emails:', error)
//     }
//   }

//   if (!session) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <button onClick={() => signIn()} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Sign in
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl">Hello, {session.user.name}</h1>
//       <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//         Sign out
//       </button>
//       <button onClick={fetchEmails} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
//         Fetch Emails
//       </button>
//       <button onClick={classifyEmails} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
//         Classify Emails
//       </button>
//       <div className="mt-8 w-full max-w-2xl">
//         {emails.length === 0 && <p>No emails found.</p>}
//         {emails.map((email, index) => (
//           <div key={index} className="mb-4 p-4 border rounded">
//             <h2 className="text-lg font-bold">Subject: {email.snippet}</h2>
//             <p>Category: {email.category}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const { data: session } = useSession()
  const [emails, setEmails] = useState([])

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/emails/fetch')
      console.log('Fetched emails:', response.data)
      setEmails(response.data)
    } catch (error) {
      console.error('Error fetching emails:', error) // Log the error
    }
  }

  const classifyEmails = async () => {
    try {
      const response = await axios.post('/api/emails/classify', { emails })
      setEmails(response.data)
    } catch (error) {
      console.error('Error classifying emails:', error) // Log the error
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button onClick={() => signIn()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Hello, {session.user.name}</h1>
      <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Sign out
      </button>
      <button onClick={fetchEmails} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Fetch Emails
      </button>
      <button onClick={classifyEmails} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
        Classify Emails
      </button>
      <div className="mt-8 w-full max-w-2xl">
        {emails.length === 0 && <p>No emails found.</p>}
        {emails.map((email, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h2 className="text-lg font-bold">Subject: {email.snippet}</h2>
            <p>Category: {email.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
