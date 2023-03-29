import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth' 

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const nav = useNavigate()

    const reg = async () => {
        if (password !== confirm) {
            setError('Password and confirmation do not match')
            return
        }
        await createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => nav('/articles'))
        .catch(e => setError(e.message))
    }

    return(
        <>
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <input type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <input type="password"
            name="confirm"
            id="confirm"
            placeholder="Re-enter Your Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)} />
            <button onClick={reg}>Register</button>
            <Link to="/login">Already have an Account</Link>
        </>
        
    )
}

export default Register