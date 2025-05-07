"use client"
import React from 'react'
import NextAuth from 'next-auth'
import {SessionProvider} from "next-auth/react"

const SessionWrapper = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper
