"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoMail } from "react-icons/io5"
import { MdLockPerson } from "react-icons/md"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import validator from 'validator'

const Login = () => {
    const { data: session } = useSession()
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push("/private/dashboard")
        }
    }, [session, router])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        // Clear error when user starts typing again
        if (error) setError("")
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!validator.isEmail(form.email)) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }
      
        if (form.password === "") {
            setError("Password is required")
            setIsLoading(false)
            return
        }

        try {
            const res = await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false,
            })

            if (res?.ok) {
                router.push('/private/dashboard')
            } else {
                setError("Invalid email or password")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative h-40 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/30 z-10 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
                    <Image
                        src="/login-concept-illustration.png"
                        alt="Login illustration"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="md:w-3/5 bg-gradient-to-br from-blue-500 to-blue-600 p-6 md:p-8 flex flex-col">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                        <p className="text-blue-100 mb-6">Enter your credentials to access DSAverse</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                        <div className="relative">
                            <IoMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your email"
                                className="w-full bg-white/90 rounded-full py-2 pl-11 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition duration-200"
                            />
                        </div>

                        <div className="relative">
                            <MdLockPerson className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full bg-white/90 rounded-full py-2 pl-11 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition duration-200"
                            />
                        </div>
                        
                        <div className="flex justify-center items-center text-sm text-blue-100">
                            <button 
                                type="button"
                                onClick={() => {
                                    setForm({ email: "khushi@gmail.com", password: "demo123" });
                                }}
                                className="text-blue-100 items-center justify-center text-center cursor-pointer underline hover:text-white transition duration-200"
                            >
                                Use Demo Account
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 text-red-100 px-4 py-2 rounded-lg text-center text-sm">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`bg-gradient-to-r from-pink-500 cursor-pointer to-orange-400 text-white font-medium rounded-full py-2.5 px-6 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 cursor-pointer text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Log In'}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-blue-400/30 text-center">
                        <div className="text-blue-100">
                            <p>Don't have an account?{' '}
                                <Link href="/signup" className="font-semibold text-white hover:underline transition duration-200">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login