import{createContext ,useContext , useState , useEffect} from "react"
import { auth , db } from "../firebase"
import { setDoc , doc } from "firebase/firestore"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword ,signOut ,onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const[user , setuser]=useState({})

    function signup(email ,password){
      createUserWithEmailAndPassword(auth , email ,password)
      setDoc(doc(db , "users" , email),{
        watchlist:[],
      })
    }

    function login(email ,password){
        return signInWithEmailAndPassword(auth , email ,password)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth ,(currentUser)=>{
           setuser(currentUser)
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    return(
        <AuthContext.Provider value={{signup , login, logout ,user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}
