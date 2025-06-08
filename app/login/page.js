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
import { motion } from 'framer-motion'

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                        >
                            <Image
                                src="/logo.png"
                                alt="DSAverse Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h1>
                        <p className="text-slate-500">Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                                <div className="relative">
                                    <IoMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                                <div className="relative">
                                    <MdLockPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => {
                                    setForm({ email: "demo@example.com", password: "demo123" });
                                }}
                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Use Demo Account
                            </motion.button>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
                                isLoading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : 'Sign in'}
                        </motion.button>

                        <div className="text-center text-sm text-slate-500">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Login