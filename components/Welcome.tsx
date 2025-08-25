import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Welcome = async () => {
    const user = await currentUser()
    const today = new Date()
    const monthName = today.toLocaleDateString('en-US', { month: 'long' })
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
    const date = today.getDate()

    return (
        <div className='md:mt-15 m-6 md:mx-25 mt-25 rounded-3xl p-6 md:px-20 md:max-h-96
                       glass-card'>
            <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-20 rounded-t-3xl" />
            </div>

            <div className="relative flex flex-col items-center justify-center gap-6">
                <div className="relative p-1">
                    <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden 
                                    border-[3px] border-white/60 dark:border-gray-700/60 shadow-xl 
                                    bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-700/30 dark:to-gray-800/10">
                        <img 
                            className='w-full h-full object-cover' 
                            src={user?.imageUrl} 
                            alt="user profile"
                        />
                    </div>
                    <div className="absolute -bottom-1 right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 
                                    rounded-full border-[3px] border-white dark:border-gray-800 
                                    flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">✓</span>
                    </div>
                </div>
                <div className="flex-1 text-center space-y-3">
                    <h1 className="text-2xl lg:text-3xl font-extrabold 
                                   bg-gradient-to-r from-gray-800 via-emerald-700 to-teal-700 
                                   dark:from-gray-100 dark:via-emerald-300 dark:to-teal-300 
                                   bg-clip-text text-transparent drop-shadow-sm">
                        Welcome back, {user?.firstName || 'Friend'}!
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-2 text-sm 
                                    text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2 px-3 py-1.5 
                                        bg-white/40 dark:bg-gray-800/40 rounded-full backdrop-blur-md 
                                        border border-white/30 dark:border-gray-700/40 shadow-sm">
                            <span className="text-lg">📅</span>
                            <span className="font-medium">{dayName}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 
                                        bg-white/40 dark:bg-gray-800/40 rounded-full backdrop-blur-md 
                                        border border-white/30 dark:border-gray-700/40 shadow-sm">
                            <span className="text-lg">🗓️</span>
                            <span className="font-medium">{monthName} {date}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-200 font-medium drop-shadow-sm">
                            Ready to track your expenses today?
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                            Let&apos;s make every penny count and build better financial habits together
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcome
