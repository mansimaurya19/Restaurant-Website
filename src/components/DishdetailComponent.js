import React, { Component } from 'react';
//import Menu from './MainComponent';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
class DishDetail extends Component {
	renderDish(dish) {
		if (dish !== undefined && dish !== null) {
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
	renderComments(comments) {
		if (comments !== undefined && comments.length !== 0) {
			return (
				<div className='container'>
					<h4>Comments</h4>
					<ul className='list-unstyled'>
						{comments.map((comment) => {
							return (
								<p>
									<li key={comment.id}>
										{comment.comment} <br />
										<br /> --{comment.author} ,{' '}
										{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(
											new Date(Date.parse(comment.date))
										)}
									</li>
								</p>
							);
						})}
					</ul>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
	render() {
		if (this.props.dish !== undefined && this.props.dish !== null) {
			return (
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-5 m-1'>{this.renderDish(this.props.dish)}</div>
						<div className='col-12 col-md-5 m-1'>{this.renderComments(this.props.dish.comments)}</div>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
export default DishDetail;
