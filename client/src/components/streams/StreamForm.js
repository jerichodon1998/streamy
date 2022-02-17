import React from "react";
import { Field, reduxForm } from "redux-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (error && touched)
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
	}

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues, this.props.currentUser.userId);
	};

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} />
				{this.renderError(meta)}
			</div>
		);
	};

	render() {
		return (
			<div>
				<h3>{this.props.formName}</h3>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
					<Field
						name="title"
						value={this.props.initialValues ? this.props.initialValues.title : ""}
						component={this.renderInput}
						label="Enter Title"
					/>
					<Field
						value={this.props.initialValues ? this.props.initialValues.description : ""}
						name="description"
						component={this.renderInput}
						label="Enter description"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "Must enter Title";
	}
	if (!formValues.description) {
		errors.description = "Must enter description";
	}

	return errors;
};

const mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

const StreamFormWithNavigate = (props) => {
	const navigate = useNavigate();
	return <StreamForm {...props} navigate={navigate} />;
};

const formWrapped = reduxForm({
	form: "streamForm",
	validate,
})(StreamFormWithNavigate);

export default connect(mapStateToProps)(formWrapped);
