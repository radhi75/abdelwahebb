// 164.90.183.141
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from "axios"
import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
    
    export  class addpost extends Component {
        constructor(){
            super()
            this.state={
                show:false,
                imageselected:[],
                title:"",
                content:"",
                comments:"",
                likes:0
            }
        }
        handleClose(){
            this.setState({show:false})
        }
        handleShow(){
            this.setState({show:true})
        }
      async addnewpost(){
        const {imageselected,comments,title,likes,content}=this.state
        var datavideo=''
        var dataimage=''
        const formData = new FormData()
        formData.append("file", imageselected)
        formData.append('upload_preset', 'kgiezron')
        await axios.post('http://api.cloudinary.com/v1_1/dm1xlu8ce/upload', formData).then((res) => {
         if(res.data.url.slice(res.data.url.length-4) ==='.mp4'){
           dataimage=''
           datavideo=res.data.url
         }else if(res.data.url.slice(res.data.url.length-4)==='.png'||res.data.url.slice(res.data.url.length-4)==='.jpg'){
          dataimage=res.data.url
          datavideo=''
         }
            axios.post("http://164.90.183.141/api/Create/NewPoste",{
              title:title,
              content:content,
              comments:comments,
              likes:likes,
              video:datavideo
            }).then((res)=>{
              if(res.data==="poste done"){
                window.location.href="http://www.abdelwahebbouden.com"
              }
            })
        })
      
        this.handleClose()
      }
      render() {
        const {show}=this.state
        return (
            <>
      <Button variant="primary" onClick={()=>this.handleShow()} id="postbutton">
        Add New Post
      </Button>

      <Modal show={show} onHide={()=>this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" placeholder="Enter email" />
      </Form.Group>
      <input type="file" accept="image/*,.mp4" name="image-upload" id="input" onChange={(event) => this.setState({ imageselected: event.target.files[0] })} />
                      <div className="label">
                        <label className="image-upload" htmlFor="input">
                        <AddAPhotoIcon />
						Choose your Photo
					</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.handleClose()}id="postbutton1">
            Close
          </Button>
          <Button variant="primary" onClick={()=>this.addnewpost()} id="postbutton">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        )
      }
    }
    

export default addpost