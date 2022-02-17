import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../redux/actions";
import moment from "moment";

const StreamList = () => {
	const dispatch = useDispatch();
	const streams = Object.values(useSelector((state) => state.streams)); // OBJECT.values() takes all values and put into an array form
	const currentUser = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(fetchStreams());
	}, [dispatch]);

	const renderAdmin = (stream) => {
		if (stream.userId === currentUser.userId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	};

	const renderCreateStream = () => {
		if (currentUser.isSignedIn) {
			return (
				<div style={{ textAlign: "right" }}>
					<Link className="ui button primary" to="/streams/new">
						Create Stream
					</Link>
				</div>
			);
		}
	};

	const renderList = () => {
		return streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`streams/show/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
						<div>
							created at:
							{moment(stream.createdAt).format("MM/DD/YYYY h:mm a")}
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h2>Streams</h2>
			<div className="ui celled list">{renderList()}</div>
			{renderCreateStream()}
		</div>
	);
};

// const mapDispatchToProps = (dispatch) => {
// 	return { fetchStreams: () => dispatch(fetchStreams()) };
// };

// const mapStateToProps = (state) => {
// 	// OBJECT.values() takes all values and put into an array form
// 	return { streams: Object.values(state.streams), currentUser: state.auth };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
export default StreamList;
