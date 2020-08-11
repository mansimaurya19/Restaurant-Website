import React, { Component, Fragment } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !val || val.length <= len; //Maxlen is >= val.length
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}

	handleSubmit(values) {
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render() {
		return (
			<Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className='fa fa-pencil fa-lg'></span>Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						<strong>Submit Comment</strong>
					</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<div className='col-12'>
								<Row className='form-group'>
									<Label htmlFor='rating'>Rating</Label>
									<Control.select model='.rating' className='form-control' name='rating'>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Row>
								<Row className='form-group'>
									<Label htmlFor='author'>Your Name</Label>
									<Control.text
										model='.author'
										id='author'
										className='form-control'
										name='author'
										placeholder='Your Name'
										autoComplete='off'
										validators={{ minLength: minLength(3), maxLength: maxLength(15) }}
									/>
									<Errors
										className='text-danger'
										model='.author'
										show='touched'
										messages={{
											minLength: 'Must be greater than 2 characters ',
											maxLength: 'Must be 15 characters or less',
										}}
									/>
								</Row>
								<Row className='form-group'>
									<Label htmlFor='comment'>Comment</Label>
									<Control.textarea
										model='.comment'
										id='comment'
										className='form-control'
										name='comment'
										row='6'
										autoComplete='off'
									/>
								</Row>
							</div>
							<Button type='submit' value='submit' color='primary' className='ml-0'>
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<Card>
				<CardImg width='100%' object src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	} else {
		return <div></div>;
	}
}

function RenderComments({ comments, addComment, dishId }) {
	if (comments.length !== 0) {
		return (
			<div>
				<h4>Comments</h4>
				<ul className='list-unstyled'>
					{comments.map((comment) => {
						return (
							<li key={comment.id}>
								{comment.comment} <br />
								<br />
								-- {comment.author} ,{' '}
								{new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: '2-digit',
								}).format(new Date(Date.parse(comment.date)))}{' '}
								<br />
								<br />
							</li>
						);
					})}
				</ul>
				<CommentForm dishId={dishId} addComment={addComment} />
			</div>
		);
	} else {
		return <div></div>;
	}
}

const Dishdetail = (props) => {
	if (props.dish !== null && props.dish !== undefined) {
		return (
			<div className='container'>
				<div className='row'>
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to='/home'>Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/menu'>Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className='col-12'>
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-md-5 m-1'>
						<RenderDish dish={props.dish} />
					</div>
					<div className='col-12 col-md-5 m-1'>
						<RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default Dishdetail;
