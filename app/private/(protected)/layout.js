import React from 'react'
import {authOptions} from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const ProtectedLayout = async({children}) => {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/");
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedLayout
