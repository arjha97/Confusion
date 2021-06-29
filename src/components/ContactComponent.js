import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, FormGroup, FormFeedback, Form, Col, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component{
    constructor(props){
        super(props);

        this.state = {
            fname: '',
            lname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(fname, lname, telnum, email){
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }

        if(this.state.fname && fname.length < 3)
            errors.firstname = "Length should be greater than 3"
        else if (this.state.fname && fname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.lname && lname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.lname && lname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (this.state.telnum && !reg.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';

        if(this.state.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';    

        return errors;    
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render(){

        const errors = this.validate(this.state.fname, this.state.lname, this.state.telnum, this.state.email)
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                  <div className="col-12">
                    Feedback
                  </div>
                  <div className="col-12 col-md-6">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="fname" md={2}>First Name </Label>
                            <Col md={10}>
                                <Input type="text" id="fname" name="fname" placeholder=" Enter First Name " value={this.state.fname} onChange={this.handleInputChange} valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''}/>
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lname" md={2}>Last Name </Label>
                            <Col md={10}>
                                <Input type="text" id="lname" name="lname" placeholder=" Enter Last Name " value={this.state.lmane} onChange={this.handleInputChange} valid={errors.lastname === ''}
                                    invalid={errors.lastname !== ''}/>
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Telephone Number </Label>
                            <Col md={10}>
                                <Input type="text" id="telnum" name="telnum" placeholder=" Enter Telephone Number " value={this.state.telnum} onChange={this.handleInputChange} valid={errors.telnum === ''}
                                    invalid={errors.telnum !== ''}/>
                                <FormFeedback>{errors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email </Label>
                            <Col md={10}>
                                <Input type="text" id="email" name="email" placeholder=" Enter Email address " value={this.state.email} onChange={this.handleInputChange} valid={errors.email === ''}
                                    invalid={errors.email !== ''}/>
                                <FormFeedback>{errors.email}</FormFeedback>    
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 2}}>
                                <FormGroup check>
                                  <Label check>
                                      <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange} />{''}
                                      <strong>May We Contact You!</strong>
                                  </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="message">Feedback</Label>
                            <Col>
                             <Input type="textarea" id="message" name="message" row={12} value={this.state.message} onChange={this.handleInputChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md={{size: 10, offset: 2}}>
                              <Button type="submit" color="primary">Submit</Button>
                          </Col>
                        </FormGroup>
                    </Form>
                  </div>
                </div>
            </div>
        );
    }
}

export default Contact;