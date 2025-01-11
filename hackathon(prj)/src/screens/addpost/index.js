import { useNavigate } from "react-router-dom"
import { product } from "../../config/firebase"
import { useState } from "react"
import "./addpost.css"

export default function AddPost() {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')

    const onSubmit = async() => {
        try{
    await product({title, image})
    
    navigate('/')
    }catch(e) {
        alert(e.message)
    }
    }
    return <>
<div>

<div className="addpost">
<h2 className="addpost-h1">Add New Post!</h2>

<div className="input">
    <p className="label">title</p>
    <input onChange={(e) => setTitle(e.target.value)}/>
</div>



<div className="input">
    <p className="label">image</p>
    <input onChange={(e) => setImage(e.target.files[0])} className="img-btn" type="file" />
</div>
<button className="addpost-button" onClick={onSubmit}>addPost</button>

</div>
</div>
</>
}