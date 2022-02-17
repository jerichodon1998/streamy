import React from "react";
import StreamForm from "./StreamForm";
import { useNavigate } from "react-router-dom";
import { createStream } from "../../redux/actions";
import { connect } from "react-redux";

class StreamCreateNoNavigate extends React.Component {
	onSubmit = (formValues, userId) => {
		this.props.createStream(formValues, userId);
		this.props.navigate("/");
	};

	render() {
		return <StreamForm formName="Stream Create" onSubmit={this.onSubmit} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return { createStream: (formValues, userId) => dispatch(createStream(formValues, userId)) };
};

// const mapStateToProps = (state) => {
// 	return { currentUser: state.auth };
// };

const StreamCreate = (props) => {
	const navigate = useNavigate();
	return <StreamCreateNoNavigate {...props} navigate={navigate} />;
};

export default connect(null, mapDispatchToProps)(StreamCreate);
