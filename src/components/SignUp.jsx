import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function SignUp() {
    const navigate = useNavigate()
    const disptach = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    disptach(login(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center'
        >
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have a account?
                    <Link
                        to="/login"
                        className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name: "
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid"
                                },
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type='Submit'
                            className='w-full'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp