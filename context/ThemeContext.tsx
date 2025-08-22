'use client'
import { useContext, useEffect, useState, createContext} from "react";


type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme : Theme;
    themeToggle : ()=>void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({children} : {children : React.ReactNode}){
    const [isMounted, setisMounted] = useState(false)
    const [theme, settheme] = useState<Theme>('light')

    useEffect(()=>{
        setisMounted(true)
        const savedTheme = localStorage.getItem('theme') as Theme
        if(savedTheme){
            settheme(savedTheme)
        }else{
            const isSystemPreferenceDark = window.matchMedia('(prefers-color-scheme: dark)').matches //query || ans is boolean(.matches)
            if(isSystemPreferenceDark) settheme('dark')
        }
    },[] )
    
    //add to html
    useEffect(()=>{
        if(isMounted){
            localStorage.setItem('theme', theme)
        }
        if(theme==='dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    }, [isMounted, theme]);

    const themeToggle = () => {
       settheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

    return(
         <ThemeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
    )
}

//custom hook
export function useTheme(){
    const context = useContext(ThemeContext)
    if(context===undefined){
throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}