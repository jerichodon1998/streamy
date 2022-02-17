import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStream, editStream } from "../../redux/actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

const StreamEdit = () => {
	const URLparams = useParams();
	const dispatch = useDispatch();
	const stream = useSelector((state) => state.streams[URLparams.id]);
	const navigate = useNavigate();
	const onSubmit = (formValues) => {
		dispatch(editStream(formValues, URLparams.id));
		navigate("/");
	};

	useEffect(() => {
		dispatch(fetchStream(URLparams.id));
	}, [dispatch, URLparams.id]);

	const renderStream = () => {
		if (stream)
			return (
				<div>
					<h3>Edit a Stream</h3>
					<StreamForm
						initialValues={_.pick(stream, "title", "description")}
						onSubmit={onSubmit}
					/>
				</div>
			);
	};
	return <div>{!stream ? <div>...Loading</div> : renderStream()}</div>;
};

export default StreamEdit;
