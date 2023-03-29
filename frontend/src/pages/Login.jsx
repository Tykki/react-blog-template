import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const nav = useNavigate()

    const login = async () => {
        await signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => nav('/articles'))
        .catch(e => setError(e.message))
    }

    return(
        <>
            <h1>Log In</h1>
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
            <button onClick={login}>Log In</button>
            <Link to="/Register">Create Account Here</Link>
        </>
    )
}

export default Login