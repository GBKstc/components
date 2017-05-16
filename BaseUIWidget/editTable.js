/**
 * Created by Administrator on 2017/5/16.
 */
import React from 'react'
import Panel from './Panel'
import { Table, Button, Row, Input, message, Popconfirm, DatePicker, Col } from 'antd';
import {Post, URL } from '../system/Post'
import moment from 'moment';
import {isEmpty, cpy, isEqual} from '../util/variable';
const columns = [
	{
		title: '序列号',
		dataIndex: 'key',
		key: 'key',
		width: '10%',
		sorter: false,
	}, {
		title: '类别',
		dataIndex: 'category',
		key: 'category',
		width: '10%',
		sorter: false,
	}, {
		title: '备注',
		dataIndex: 'content',
		key: 'content',
		width: '55%',
		sorter: false,
	},{
		title: "创建者",
		dataIndex: "create_name",
		key: "create_name",
		width: '10%',
		sorter: false,
	},{
		title: "创建时间",
		dataIndex: "create_time",
		key: "create_time",
		width: '15%',
		sorter: false,
		render: text => {
			//console.log(text);
			return text?moment(text).format('YYYY-MM-DD'):"";
		}
	}
];

class EditTable extends React.Component{
	constructor(props){
		super(props);
		this.getData = this.getData.bind(this);
		//this.valueChange = this.valueChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.addRow = this.addRow.bind(this);
		this.delRow = this.delRow.bind(this);
		this.editRow = this.editRow.bind(this);
		this.saveRow = this.saveRow.bind(this);
		this.state = {
			dataSource:undefined,
			index:undefined,
			buttonState:{add:false,del:false,edit:false,save:true},
			selectedKeys:undefined,
			columns:columns,
		};
		this.record = {};
		this.addList = [];
		this.editList = [];
		this.URL = {};
		this.requireList = {
			category: 1,
			content: 1,
			id:0
		}
	}

	componentWillMount(){
		$(".ant-table-body").css("height", "400px");
		this.setState({
			selectedKeys:this.props.id||"",
			columns:this.props.columns,
		});
		this.URL = this.props.URL;
		this.title = this.props.title||"表格";
		this.foot = this.props.foot||null;
		this.getData(this.props.id);
	}

	componentDidMount() {
		$(".ant-table-body").css("height", "400px");
	}

	componentWillReceiveProps(nextProps){
		if(this.state.selectedKeys!==nextProps.id){
			// this.state.selectedKeys = nextProps.id;
			this.setState({
				selectedKeys:nextProps.id,
			});
			this.getData(nextProps.id);
		}
	}

	getData(id=""){
		if (id!==""){
			Post(this.URL.get,{remark_id:id})
				.then(data=>{
					for (let i=0;i<data.length;i++){
						if (!data[i].key){
							data[i] = Object.assign({},data[i],{key:(i+1)});
						}
					}
					$(".remark td").css("background-color", "rgb(252,254,255)");
					this.addList = [];
					this.editList = [];
					this.setState({
						dataSource:data,
						record:undefined,
						buttonState:{add:false,del:false,edit:false,save:true},
						index:undefined
					})
				})
		}
	}

	valueChange(group,name,e){
		const {index} =this.state;
		this[group][index][name] = e.target.value;
	}

	//行点击
	onRowClick(record, index){
		let rowIndex = parseInt(index)+1;
		$(".remark td").css("background-color", "rgb(252,254,255)");
		$($(".remark tr:eq(" + rowIndex+ ") td")).css("background-color", "rgb(189,228,253)");
		this.record = record;
		this.setState({
			index
		})
	}

	addRow(){
		let { dataSource, buttonState } = this.state;
		if (isEmpty(dataSource)){
			dataSource=[];
		};
		let key = dataSource.length+1;
		let newRow = {
			key:key,
			remark_id: this.state.selectedKeys,
		};
		let newAdd = {remark_id: this.state.selectedKeys};
		for (let i in this.requireList){
			newAdd[i]="";
			switch (this.requireList[i]){
				case 1:
					newRow[i] = <Input onChange={this.valueChange.bind(this,"addList",i+"")}/>;
					continue;
				case 2:
					newRow[i] = <DatePicker/>;
					continue;
			}
		}
		buttonState.save = false;
		buttonState.edit = true;
		this.addList[dataSource.length] = newAdd;
		dataSource.push(newRow);
		this.setState({
			dataSource,
			buttonState
		});

	}

	delRow(){
		let { dataSource, index, buttonState } = this.state,
			delId = dataSource[index].id||"";
		if(isEmpty(delId)){
			$(".remark td").css("background-color", "rgb(252,254,255)");
			dataSource.splice(index, 1);
			this.addList.splice(index, 1);
			if (isEmpty(this.addList)){
				buttonState.edit = false;
			}
			this.setState({
				dataSource,
				buttonState,
				index:undefined
			})
		}else {
			Post(this.URL.delete,{data:[delId]}).then(data=>{
				message.success("删除成功");
				this.getData(this.state.selectedKeys);
			})
		}

	}

	editRow(){
		let { dataSource, index, buttonState } = this.state;
		let editRow = cpy(this.record);
		this.editList[index] = {};
		for (let i in this.requireList){
			this.editList[index][i] = this.record[i];
			switch (this.requireList[i]){
				case 1:
					editRow[i] = <Input defaultValue={editRow[i]} onChange={this.valueChange.bind(this,"editList",i+"")}/>;
					continue;
				case 2:
					editRow[i] = <DatePicker/>;
					continue;
			}
		}
		buttonState.save = false;
		buttonState.add = true;
		buttonState.edit = true;
		buttonState.del = true;
		dataSource.splice(index, 1, editRow);
		this.setState({
			dataSource,
			buttonState
		})
	}

	saveRow(){
		let data = [];
		if (this.addList.length){
			for (let i in this.addList){
				for (let o in this.requireList){
					if (o!=="id"&&isEmpty(this.addList[i][o])){
						message.warning("请填写完整");
						return ;
					}
				}
				data.push(cpy(this.addList[i]));
			}
			Post(this.URL.add,{data:data}).then(data=>{
				message.success("添加成功");
				this.getData(this.state.selectedKeys);
			})
		}
		if (this.editList.length){
			for (let i in this.editList){
				for (let o in this.requireList){
					if (isEmpty(this.editList[i][o])){
						message.warning("请填写完整");
						return ;
					}
				}
				data.push(cpy(this.editList[i]));
			}
			Post(this.URL.update,{data:data}).then(data=>{
				message.success("修改成功");
				this.getData(this.state.selectedKeys);
			})
		}
	}

	render(){

		return(
			<Panel
				title={this.title}
				foot={
					<Row type="flex" justify="start">
						<Col span={12}>
							{this.foot}
						</Col>
						<Col span={12}>
							<Row type="flex" justify="end">
								<Button type="primary" size="small" onClick={this.addRow} disabled={this.state.buttonState.add||isEmpty(this.state.selectedKeys)}>添加</Button>
								<Popconfirm title={"确定要删除?"} onConfirm={this.delRow} okText="确定" cancelText="取消">
									<Button type="primary" size="small" disabled={isEmpty(this.state.index)||this.state.buttonState.del}>删除</Button>
								</Popconfirm>
								<Button type="primary" size="small" onClick={this.editRow} disabled={isEmpty(this.state.index)||this.state.buttonState.edit}>修改</Button>
								<Button type="primary" size="small" onClick={this.saveRow} disabled={this.state.buttonState.save}>保存</Button>
								<Button type="primary" size="small" onClick={()=>{this.getData(this.state.selectedKeys);}}>取消</Button>
							</Row>
						</Col>
					</Row>
				}
			>
				<Table
					className={"remark"}
					bordered
					columns={this.state.columns}
					dataSource={this.state.dataSource}
					size="small"
					pagination={false}
					scroll={{y:400}}
					onRowClick={this.onRowClick}
				/>
			</Panel>
		)
	}
}

export default EditTable