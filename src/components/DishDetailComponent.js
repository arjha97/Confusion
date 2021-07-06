import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Card, CardImg, Breadcrumb, BreadcrumbItem, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, Row } from "reactstrap";


const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component{
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false,
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
        } 

        handleCommentFormSubmit(values) {
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
    
    
        }
    

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen,
            })
        }

        render(){
            return(
                <div>
                  <Button outline onClick={this.toggleModal}><span className="fa fa-comment fa-lg"></span> Submit Comment</Button>  

                  <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                      <ModalHeader toggle={this.toggleModal}>
                        <strong>Submit your Comment</strong>
                      </ModalHeader>
                      <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}> 
                          <Row className="form-group">
                            <Label htmlFor="rating">Rating </Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{
                                            required
                                    }} >
                                    <option>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select> 
                                <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />     
                          </Row>  
                          <Row className="form-group">
                            <Label htmlFor="yname">Your Name </Label>
                                <Control.text model=".yname" id="yname" name="yname" placeholder="Your Name please!" rows="10" className="form-control"
                                 validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                                <Errors
                                        className="text-danger"
                                        model=".yname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                          </Row>
                          <Row className="form-group">
                            <Label htmlFor="comment">Comment </Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" 
                                 validators={{
                                    required
                                }} />
                                <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                          </Row>
                          <Row className="mt-1 form-group">
                                <Button type="submit" color="primary">Submit</Button>
                          </Row>
                        </LocalForm>
                      </ModalBody>
                  </Modal>
                </div>
            )
        }
    }

    function RenderDish({dish}){
        if(dish != null){
                return (
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle> {dish.name}</CardTitle>
                                <CardText> {dish.description} </CardText>
                            </CardBody>
                        </Card>
                    </div>   
                );
            }
            else {
                return (
                    <div></div>
                );
            };  
    }
 

   function RenderComments({comments}){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })

        

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <div className="mt-3">
                  <CommentForm  />
                </div>
            </div>
        )
    }


    const DishDetail = (props) => {
        
        if (props.dish == null) {
            return (<div></div>);
        }    

        return (
          <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments}/>
                
            </div>
          </div>  
        )
    }
    

export default DishDetail;