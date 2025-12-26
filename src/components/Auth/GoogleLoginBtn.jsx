import { signInWithPopup } from "firebase/auth"
import{ auth, googleProvider} from '../../firebase.js'
import { useDispatch } from "react-redux"
import { uiActions } from "../../store/ui-slice"
import { useNavigate } from "react-router-dom"

const GoogleLoginBtn = ()=>{
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const signInWithGoogle = async()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result)
            const user = result.user
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Google login successed',
                message: `Hi, ${user.displayName}. Welcome to Pure shopping.`,
            }))
            navigate('/')
        }catch(error){
            if(error.code === 'auth/account-exists-with-different-credential'){
                console.error('Account already exists, please use other ways to login')
            }else{
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Google login failed',
                    message: error.message
                }))
            }
        }
    }
    return(
         <button onClick={signInWithGoogle}>use Google account to login</button>
    )
}
export default GoogleLoginBtn