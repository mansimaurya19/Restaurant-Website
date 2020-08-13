import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: '',
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
    };
    // First Name Validate
    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = 'First Name should be atleast 3 characters';
    else if (this.state.touched.firstname && firstname.length > 15)
      errors.firstname = 'First Name should be less than 16 characters';
    // Last Name Validate
    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = 'Last Name should be atleast 3 characters';
    else if (this.state.touched.lastname && lastname.length > 15)
      errors.lastname = 'Last Name should be less than 16 characters';
    // Telephone Number Validate
    const reg = /^\d+$/;
    if (this.state.touched.telnum && (!reg.test(telnum) || telnum.length != 10))
      errors.telnum = 'Please Input Valid Telephone Number';
    // Email Validate
    if (this.state.touched.email && email.split('').filter((x) => x === '@').length !== 1)
      errors.email = 'Please Input Valid Email Address';

    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Current State Is: ' + JSON.stringify(this.state));
    alert('Current State Is: ' + JSON.stringify(this.state));
  }

  render() {
    const { firstname, lastname, telnum, email, agree, contactType, message } = this.state;

    const errors = this.validate(firstname, lastname, telnum, email);

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
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor='firstname' md={3}>
                  First Name
                </Label>
                <Col md={9}>
                  <Input
                    type='text'
                    id='firstname'
                    name='firstname'
                    placeholder='First Name'
                    autoComplete='off'
                    value={firstname}
                    valid={errors.firstname === ''}
                    invalid={errors.firstname !== ''}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('firstname')}
                  />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='lastname' md={3}>
                  Last Name
                </Label>
                <Col md={9}>
                  <Input
                    type='text'
                    id='lastname'
                    name='lastname'
                    placeholder='Last Name'
                    autoComplete='off'
                    value={lastname}
                    valid={errors.lastname === ''}
                    invalid={errors.lastname !== ''}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('lastname')}
                  />
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='telnum' md={3}>
                  Telephone No.
                </Label>
                <Col md={9}>
                  <Input
                    type='tel'
                    id='telnum'
                    name='telnum'
                    placeholder='Telephone No.'
                    autoComplete='off'
                    value={telnum}
                    valid={errors.telnum === ''}
                    invalid={errors.telnum !== ''}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('telnum')}
                  />
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='email' md={3}>
                  Email
                </Label>
                <Col md={9}>
                  <Input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    value={email}
                    valid={errors.email === ''}
                    invalid={errors.email !== ''}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('email')}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 5, offset: 3 }}>
                  <FormGroup check>
                    <Label check>
                      <Input type='checkbox' name='agree' checked={agree} onChange={this.handleInputChange} />{' '}
                      By clicking this you <strong>agree</strong> that <strong>we may Contact You.</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Input
                    type='select'
                    name='contactType'
                    value={contactType}
                    onChange={this.handleInputChange}
                  >
                    <option>Phone</option>
                    <option>Email</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='message' md={3}>
                  Your Feedback
                </Label>
                <Col md={9}>
                  <Input
                    type='textarea'
                    id='message'
                    name='message'
                    row='12'
                    autoComplete='off'
                    value={message}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 5 }}>
                  <Button type='submit' color='primary'>
                    Send Feedback
                  </Button>
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
