import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len; //Maxlen is >= val.length
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(val);

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Current State Is: ' + JSON.stringify(values));
    this.props.postFeedback(values);
    this.props.resetFeedbackForm();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/home'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Location Information</h3>
          </div>
          <div className='col-12 col-sm-4 offset-sm-1'>
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className='fa fa-phone'></i>: +852 1234 5678
              <br />
              <i className='fa fa-fax'></i>: +852 8765 4321
              <br />
              <i className='fa fa-envelope'></i>: <a href='mailto:confusion@food.net'>confusion@food.net</a>
            </address>
          </div>
          <div className='col-12 col-sm-6 offset-sm-1'>
            <h5>Map of our Location</h5>
          </div>
          <div className='col-12 col-sm-11 offset-sm-1'>
            <div className='btn-group' role='group'>
              <a role='button' className='btn btn-primary' href='tel:+85212345678'>
                <i className='fa fa-phone'></i> Call
              </a>
              <a role='button' className='btn btn-info'>
                <i className='fa fa-youtube'></i> You Tube
              </a>
              <a role='button' className='btn btn-success' href='mailto:confusion@food.net'>
                <i className='fa fa-envelope-o'></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Send Us Your Feedback</h3>
          </div>
          <div className='col-12 col-md-9'>
            <Form model='feedback' onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Label htmlFor='.firstname' md={3}>
                  First Name
                </Label>
                <Col md={9}>
                  <Control.text
                    model='.firstname'
                    id='firstname'
                    className='form-control'
                    name='firstname'
                    placeholder='First Name'
                    autoComplete='off'
                    validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                  />
                  <Errors
                    className='text-danger'
                    model='.firstname'
                    show='touched'
                    messages={{
                      required: 'Required ',
                      minLength: 'Must be greater than 2 characters ',
                      maxLength: 'Must be under 15 characters ',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='lastname' md={3}>
                  Last Name
                </Label>
                <Col md={9}>
                  <Control.text
                    model='.lastname'
                    id='lastname'
                    className='form-control'
                    name='lastname'
                    placeholder='Last Name'
                    autoComplete='off'
                    validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                  />
                  <Errors
                    className='text-danger'
                    model='.lastname'
                    show='touched'
                    messages={{
                      required: 'Required ',
                      minLength: 'Must be greater than 2 characters ',
                      maxLength: 'Must be under 15 characters ',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='telnum' md={3}>
                  Telephone No.
                </Label>
                <Col md={9}>
                  <Control.text
                    model='.telnum'
                    id='telnum'
                    className='form-control'
                    name='telnum'
                    placeholder='Telephone No.'
                    autoComplete='off'
                    validators={{ required, minLength: minLength(10), maxLength: maxLength(10), isNumber }}
                  />
                  <Errors
                    className='text-danger'
                    model='.telnum'
                    show='touched'
                    messages={{
                      required: 'Required ',
                      minLength: 'Must be 10 characters ',
                      maxLength: 'Must be 10 characters ',
                      isNumber: 'Must be numeric value only ',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='email' md={3}>
                  Email
                </Label>
                <Col md={9}>
                  <Control.text
                    model='.email'
                    id='email'
                    className='form-control'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    validators={{ required, validEmail }}
                  />
                  <Errors
                    className='text-danger'
                    model='.email'
                    show='touched'
                    messages={{
                      required: 'Required ',
                      validEmail: 'Enter Valid Email Address ',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={{ size: 5, offset: 3 }}>
                  <div className='form-check'>
                    <Label check>
                      <Control.checkbox model='.agree' name='agree' className='form-check-input' /> By
                      clicking this you <strong>agree</strong> that <strong>we may Contact You.</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Control.select model='.contactType' className='form-control' name='contactType'>
                    <option>Phone</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='message' md={3}>
                  Your Feedback
                </Label>
                <Col md={9}>
                  <Control.textarea
                    model='.message'
                    id='message'
                    className='form-control'
                    name='message'
                    row='12'
                    autoComplete='off'
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={{ size: 10, offset: 5 }}>
                  <Button type='submit' color='primary'>
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;