"use client"
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AppContext = createContext();
export const AppProvider = ({children})=>{

    const route = useRouter();
    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)
    const [isOwner,setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister,setShowRegister] = useState(false)
    const [pickupDate,setPickupDate] = useState('')
    const [returnDate,setReturnDate] = useState('')

    const[cars,setCars] = useState([])

    //function to check if user is logged in
    const fetchUser = async() =>{
        try {
            const {data} = await axios.get('api/user/data')
            if(data.success) {
                setUser(data.user)
                setIsOwner(data.user.role === 'owner')
            }else{
                route.push('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //fetch cars
    const fetchCars = async() =>{
        try {
            const {data} = await axios.get('api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setIsOwner(false)
        setUser(null)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out')
    }

    //retrive token from localstorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars();
    },[])

    //to fetch userdata when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser();
        }
    },[token])



    // add any variable function in this obj that will accessable in any component
    const value = {
        route,currency,axios,user,isOwner,token, setToken,setUser,setIsOwner,cars,setCars,showLogin,setShowLogin,fetchCars,fetchUser,logout,
        pickupDate,setPickupDate,returnDate,setReturnDate,showRegister,setShowRegister
    }

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}

export const useAppContext = () =>{
    return (
        useContext(AppContext)
    )
}