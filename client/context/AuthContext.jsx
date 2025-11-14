import { useState, useEffect, useRef } from 'react';
import { createContext } from "react";
import axios from 'axios' 
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socketRef = useRef(null)

    //check if user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async () => {
        try {
            const {data} = await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Login function to handle user authentication and socket connection
    const login = async (state, credentials)=>{
        try {
            const {data} = await axios.post(`/api/auth/${state}`, credentials)
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                setToken(data.token);
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Logout function to handle user logout and socket disconnection
    const logout = async ()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        delete axios.defaults.headers.common["Authorization"];
        toast.success("Logged out successfully");
        if(socketRef.current){
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }

    //Update profile function to handle user profile updates
    const updateProfile = async (body)=>{
        try {
            const {data} = await axios.put("/api/auth/update-profile", body)
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) => {
        if(!userData) return;

        if(socketRef.current && socketRef.current.connected){
            const existing = socketRef.current.handshake?.query?.userId;
            if(existing && String(existing) === String(userData._id)) return;
        }

        const newSocket = io(backendUrl, {
            query: { userId: String(userData._id) },
            transports: ["websocket"]
        });

        socketRef.current = newSocket;

        newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUsers((userIds || []).map(id => String(id)));
        });
    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        checkAuth()
        return ()=>{
            if(socketRef.current){
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        }
    },[])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket: socketRef.current,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
