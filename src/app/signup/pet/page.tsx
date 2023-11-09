import SignupDogForm from '@/components/SignupDogForm';
import React from 'react'

function page() {
    return (
        <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
            <div className="container mb-24 lg:mb-32">
                <SignupDogForm />
            </div>
        </div>
    )
}

export default page