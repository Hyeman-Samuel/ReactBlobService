import React, { Component } from 'react';
import {Upload} from '../Services/AzureService'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

class Gallery extends Component {
    state = {
        currentFile:"",
        imageLinks:[], }

 UploadToAzure=()=>{
     let link = Upload(this.state.currentFile).then((link)=>{
         var newImages = this.state.imageLinks
         newImages.push(link)
        this.setState({Images: newImages })
    })    
 }  

 HandlePictureChanged=(event)=>{
       this.setState({currentFile:event.target.files})
 }

    render() { 
        return(      
        <div>
        <button onClick={this.UploadToAzure}>Add Image</button>
        <input onChange={this.HandlePictureChanged} title="File" type="file"/>
        <Container fluid="md">
        <div className="row">  
        <Row>  
        {            
        this.state.imageLinks.map((x,index)=>{       
           return  <Col md="4" style={{padding:'10px'}}><img width="200" height="200" src={x} key={index}></img></Col>               
        })        
        }
        </Row>
        </div>
        </Container>
        </div>
        )}
}
 
export default Gallery;