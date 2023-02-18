import { useEffect, useState } from "react"
import { registerUser } from "../firebase/firebase";
import PhoneInput from "../components/PhoneInput";
import {Input, Button} from '@mui/material'
import defaultAvatar from '../assets/empty-avatar.jpg'
import dataUrlToFile from '../utils/dataUrlToFile.js'
import CropImageButton from "../components/CropImageButton";


  // register add avatar and crop here
export default function RegisterForm({ addSingleUserToState }) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    console.log(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    const file = e.target.files[0]
    if (!file) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(file)
  }
  

  const onChangeFile = file => {
    if (!file) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(file)
  }

  useEffect(() => {
    onChangeFile(dataUrlToFile(defaultAvatar))
  }, [])

  const onSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const {name, surname, phone, email, birthDate} = event.target
    const avatar = selectedFile
    await registerUser({
      name: name.value,
      surname: surname.value,
      phone: '+380 ' + phone.value,
      email: email.value,
      birthDate: birthDate.value,
      avatar
    }).then((newUser) => {
      setLoadingMessage('Registered successfully')
      addSingleUserToState(newUser)
    })
    .catch(() => setLoadingMessage('Failed to register'))
    setLoading(false)
  }
  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])

  return (
    <div>
      <h1 style={{marginLeft: '35px'}}>Register</h1>
      <div>
              <form onSubmit={onSubmit} className='registerForm'>

                {/* avatar preview and crop */}
                  <div>
                    <div className="selectAvatar" onClick={() => document.querySelector('input[name=avatar]').click()}>
                      {
                        preview 
                          ?
                            <img src={preview} alt="preview" className="avatar" />
                          :
                          <img src={defaultAvatar} alt="preview" className="avatar" />
                      }
                    </div>
                    <CropImageButton onChangeFile={onChangeFile} selectedFile={selectedFile} preview={preview}/>
                  </div>
                  
                
                {/* text inputs */}
                <div>
                  <Input type="text" name="name" inputProps={{"aria-required": true}} sx={{display: 'block', width: '300px'}} placeholder="Ім'я" required/>
                  <Input type="text" name="surname" inputProps={{"aria-required": true}} sx={{display: 'block', width: '300px'}} placeholder="Прізвище" required/>
                  <Input type="email" name="email" inputProps={{"aria-required": true}} sx={{display: 'block', width: '300px'}} placeholder="Email" required/>
                  <PhoneInput type="tel" name="phone" inputProps={{"aria-required": true}} sx={{ paddingLeft: '40px', width: '300px'}} placeholder="Телефон" required/>
                  <Input type="date" name="birthDate"  inputProps={{"aria-required": true}} sx={{display: 'block', width: '300px'}} placeholder="Дата народження" required/>
                  <input
                    name='avatar'
                    type="file"
                    onChange={onSelectFile}
                    accept="image/*"
                    style={{display: 'none'}}
                  />
                  <Button type={'submit'} 
                    variant="contained" 
                    color="success" 
                    sx={{
                      marginTop: '10px', 
                      display: 'block'}}
                    >Register User</Button>

                    {/* loading */}
                  <p>{loadingMessage}</p>
                  {loading && <div className="spinner registerSpinner"></div>}
                </div>
              </form>
              
            
      </div>
    </div>



  )

}