import SignUp from "../../component/googlelogin"
import { useState } from "react"

import "./login.css"
import { Register } from "../../config/firebase"

export default function Login() {

const [email, setEmail] = useState()
const [password, setPassword] = useState()
    
return <>
<div class="login-wrapper">
<div class="login-card">
      <h2>Login</h2>
<p class="welcome-text">Welcome back! Please enter your details to continue.</p>
  <div>
<div class="input-field">
  <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
</div>
<div class="input-field">
  <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required />
</div>
    <button type="submit" class="btn" onClick={() => Register(email, password)}>Login</button>
<div>
    <SignUp />
</div>
  </div>
</div>
</div>
</>
}