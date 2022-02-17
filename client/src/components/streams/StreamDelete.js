import React, { useEffect } from "react";
import Modal from "../Modal";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStream, deleteStream } from "../../redux/actions";

const StreamDelete = () => {
	const URLparams = useParams();
	const dispatch = useDispatch();
	const stream = useSelector((state) => state.streams[URLparams.id]);
	const navigate = useNavigate();

	const onDeleteStream = () => {
		dispatch(deleteStream(URLparams.id));
		navigate("/");
	};

	const actions = (
		// Or we can use <></> also a shorthand of react fragment
		<React.Fragment>
			<div onClick={onDeleteStream} className="ui button negative">
				Delete
			</div>
			<Link to="/" className="ui button">
				Cancel
			</Link>
		</React.Fragment>
	);

	useEffect(() => {
		dispatch(fetchStream(URLparams.id));
	}, [URLparams.id, dispatch]);

	const renderContent = () => {
		if (!stream) {
			return "Are you sure you want to delete this stream?";
		} else {
			return `Are you sure you want to delete this stream with title: ${stream.title}`;
		}
	};

	return (
		<div>
			<Modal
				content={renderContent()}
				header={"Delete Stream"}
				actions={actions}
				onModalDismiss={() => navigate("/")}
			/>
		</div>
	);
};

export default StreamDelete;
