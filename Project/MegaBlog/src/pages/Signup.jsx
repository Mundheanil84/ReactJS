import React from 'react'
import { Login as LoginComponent } from '../components/index' // Capitalized variable name
function Login() {
  return (
    <div className='py-8'>
        <LoginComponent /> {/* Capitalized component name */}
    </div>
  )
}

export default Login