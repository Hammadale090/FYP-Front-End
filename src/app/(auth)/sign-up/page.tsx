
import SignUpForm from '@/features/Auth/SignUp/SignUpForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'



type Props = {}

const Register = async (props: Props) => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (user) {
        return null;
    }

    return (
        // <Suspense>
            <div className='h-[100vh] '>
                {/* signup form */}

                <SignUpForm />

            </div >
        // </Suspense>
    )
}

export default Register