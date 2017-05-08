/**
 * Created by Administrator on 2017/5/7.
 */
import React from "react";
import { render } from "react-dom";
import "./utilTest/variable_test";

class HelloWorld extends React.Component{
	render(){
		return (
			<div>Hello World !</div>
		);
	}
}

render(<HelloWorld/>,document.getElementById("content"));
