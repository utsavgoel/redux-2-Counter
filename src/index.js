import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import { Provider, connect} from 'react-redux';

class Counter extends Component {
	

	render = () => {
		const {	inc,value,dec } = this.props
		
		const incOdd = () =>
		{
			if(value%2!==0)
			return {inc}
		}
		
		const incAsync = () =>
		{
			setTimeout({inc},1000)
		}
		
		return (
			<div>
				<span>{value}</span><br></br>
				<button onClick={inc}> + </button>
				<button onClick={dec}> - </button>
				<button onClick={incOdd()}> +(odd) </button>
				<button onClick={incAsync()}> +(Async) </button>
			</div>
			)
	}
}

Counter.PropTypes = {
	value: PropTypes.number.isRequired,
	inc: PropTypes.func.isRequired,
	dec: PropTypes.func.isRequired
}

const increaseA= {type:'increase'}, decreaseA= {type:'decrease'}

const counter = (state = {count: 0}, action) => {
	
	const count = state.count
	
	switch(action.type)
	{
		case 'increase' : return {count : count+1}
		case 'decrease' : return {count : count-1}
		default: return state
	}
}

const store= createStore(counter)

const mapStateToProps = (state) => {
	return { value: state.count }
}
const mapDispatchToProps = (dispatch) => {
	return {
		inc : () => dispatch(increaseA),
		dec : () => dispatch(decreaseA),
		
	}
}
const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter)

ReactDOM.render(
		<Provider store= {store}>
		<App/>
		</Provider>,
		document.getElementById('root')
		);