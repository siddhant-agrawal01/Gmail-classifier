import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={() => signIn('google')} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  )
}
