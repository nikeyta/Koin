'use client'
import {useState, useEffect} from 'react'
import { useTheme } from '../context/ThemeContext'


const ThemeBtn=()=>{
  const { theme, themeToggle } = useTheme();
  return (
 <button onClick={themeToggle} className="text-2xl">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeBtn
