import Link from 'next/link'
import { signupAction } from '../../actions/signupAction'

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50">
          <h1 className="text-3xl font-bold mb-2 text-center">Create an account</h1>
          <p className="text-gray-400 text-center mb-8">Sign Up</p>

          <form action={signupAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{' '}
            <Link href="/" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
