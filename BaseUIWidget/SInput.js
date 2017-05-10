/**
 * Created by Administrator on 2017/5/10.
 */
import React from 'react'
import {Input, message} from 'antd';
import {cpy,isEmpty} from "../util/variable";

const errorMsg = "输入不合规则!";

class SInput extends React.Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onPressEnter = this.onPressEnter.bind(this);
		console.log(this.props);
		this.state = {
			value: !isEmpty(this.props.value) ? this.props.value : ""
		}
	}

	//传进来的props可能会改变, 当改变时需要重新修改value的值
	componentWillReceiveProps(nextProps){
		if(nextProps.value !== this.props.value){
			this.setState({
				value: nextProps.value
			});
		}
	}

	onChange(e){
		//避免多次调用
		let value = e.target.value;
		if(value === this.state.value)
			return;
		if(!isEmpty(this.props.checkChange) && !this.props.checkChange(e.target.value)){
			message.error(this.props.checkChangeMsg ?　this.props.checkChangeMsg : errorMsg);
			return;
		}
		this.setState({
			value: value
		});
		if(this.props.onChange)
			this.props.onChange(e);
		if (this.props.onChangeValue)
			this.props.onChangeValue(value);
		if(this.props.onInputEnd)
			this.props.onInputEnd(value);
	}

	onBlur(e){
		console.log(this.props.checkOnEndMsg);
		if(this.props.checkOnEnd && this.props.checkOnEnd(e.target.value)){
			message.error(this.props.checkOnEndMsg ? this.props.checkOnEndMsg : errorMsg);
			return;
		}
		if(this.props.onBlur)
			this.props.onBlur(e);
	}

	onPressEnter(e){
		if(this.props.checkOnEnd && !this.props.checkOnEnd(e.target.value)){
			message.error(this.props.checkOnEndMsg ? this.props.checkOnEndMsg : errorMsg);
			return;
		}
		if(this.props.onPressEnter)
			this.props.onPressEnter(e);
	}

	render() {
		//因props是只读的, 这里将其传给另一个值用于修改
		let props = cpy(this.props);
		props.onChange = this.onChange;
		props.onBlur = this.onBlur;
		props.onPressEnter = this.onPressEnter;
		//如果传入了props.value, 想要设置props的value
		if(props.hasOwnProperty("value")){
			props.value = this.state.value;
		}
		if(isEmpty(props.size))
			props.size = "small";

		return (
			<Input
				{...props}
			/>
		)
	}
}

export default SInput