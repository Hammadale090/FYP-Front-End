import LogInForm from '@/features/Auth/LogIn/LogInForm'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {}

const Login = async (props: Props) => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (user) {
        return null;
    }

    return (
        <div className='h-[100vh] '>

            {/* login text */}
            <LogInForm />

        </div >
    )
}

export default Login