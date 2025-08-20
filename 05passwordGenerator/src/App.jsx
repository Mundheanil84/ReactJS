// import { useState, useCallback, useEffect } from 'react'
// import './App.css'

// function App() {
//   const [length, setLength] = useState(8)
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [charAllowed, setAllowed] = useState(false);
//   const [Password, setpassword] = useState("")

//   const PasswordGernerator = useCallback(() => {
//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//     if (numberAllowed) str += "0123456789"
//     if (charAllowed) str += "!@#$%^7*()%$#"

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length)
//       pass += str.charAt(char)
//     }

//     setpassword(pass)

//   }, [length, numberAllowed, charAllowed, setpassword])

//   useEffect(() => {
//     PasswordGernerator()
//   }, [length, numberAllowed, charAllowed, PasswordGernerator])

//   return (
//     <>
//       <h1 className='text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400'>
//         Password generator
//       </h1>
//       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 my-8 bg-gradient-to-r from-purple-600 to-blue-600'>
//         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//           <input 
//             type='text'
//             value={Password}
//             className='outline-none w-full py-1 px-3 bg-white/20 text-white placeholder-white/50'
//             placeholder='password'
//             readOnly
//           />
//           <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
//         </div>
//         <div className='flex text-sm gap-x-2'>
//           <div classname = 'flex items-center gap-x-1'>
//             <input
//             type = "range"
//             min={6}
//             max={100}
//             value={length}
//             className='cursor-pointer'
//             onChange={(e) => {setLength(e.target.value)}}
//             />
            
//             <label>Numbers: {}</label>
//           </div>
//           <div className='flex items-center gap-x-1'>
//             <input
//             type = "checkbox"
//             defaultChecked = {charAllowed}
//             id = "numberInput"
//             onChange={() => {
//               setNumberAllowed ((prev) => !prev);
//             }}
//             />
//             <label htmlFor='characterInput'>Characters</label>

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App

import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setAllowed] = useState(false);
  const [Password, setpassword] = useState("")
  const [copied, setCopied] = useState(false)

  const PasswordGernerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^7*()%$#"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setpassword(pass)
    setCopied(false)

  }, [length, numberAllowed, charAllowed, setpassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    PasswordGernerator()
  }, [length, numberAllowed, charAllowed, PasswordGernerator])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className='text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
        Password Generator
      </h1>
      
      <div className='w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700'>
        <div className='flex mb-6'>
          <input 
            type='text'
            value={Password}
            className='outline-none w-full py-3 px-4 rounded-l-lg bg-gray-700 text-white placeholder-gray-400'
            placeholder='Generate password'
            readOnly
          />
          <button 
            onClick={copyToClipboard}
            className={`px-4 rounded-r-lg font-medium transition-all ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='text-gray-300'>Length: {length}</label>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              className='w-48 h-2 bg-blue-600 rounded-lg appearance-none cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed(prev => !prev)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor='numberInput' className='ml-2 text-gray-300'>Numbers</label>
            </div>

            <div className='flex items-center'>
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => setAllowed(prev => !prev)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor='characterInput' className='ml-2 text-gray-300'>Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App