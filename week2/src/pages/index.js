import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Modal } from 'antd';

class CreateNewData extends React.Component {
  state = { 
    visible: false,
    productId: null,
    productName: null,
    createTime: null,
    personInCharge: null,
    productIntro: null,
   };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCreateConfirm = () => {
    console.log('handleCreateConfirm state', this.state);
    let newItem = {
        key: this.props.dataSource.products.slice(-1)[0].key + 1,
        productId: this.state.productId,
        productName: this.state.productName,
        personInCharge: this.state.personInCharge,
        productIntro: this.state.productIntro,
        createTime: this.state.createTime,
    }

    console.log('handleCreateConfirm newItem', newItem);

    this.props.dispatch({
      type: 'dataset/addNewItem',
      payload: newItem
    });

    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          create
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleCreateConfirm}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="productId" name="productId">
              <Input onChange = {(e) => this.setState({productId: e.target.value})}/>
            </Form.Item>
            <Form.Item label="productName" name="productName">
              <Input onChange = {(e) => this.setState({productName: e.target.value})}/>
            </Form.Item>
            <Form.Item label="createTime" name="createTime">
              <Input onChange = {(e) => this.setState({createTime: e.target.value})}/>
            </Form.Item>
            <Form.Item label="personInCharge" name="personInCharge">
              <Input onChange = {(e) => this.setState({personInCharge: e.target.value})}/>
            </Form.Item>
            <Form.Item label="productIntro" name="productIntro">
              <Input onChange = {(e) => this.setState({productIntro : e.target.value})}/>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      productId: null,
      productName: null,
      createTime: null,
      personInCharge: null,
     };
  }

  handleSearch = () => {
    console.log('1' == 1);
    let keywords = {
      productId: this.state.productId,
      productName: this.state.productName,
      personInCharge: this.state.personInCharge,
      createTime: this.state.createTime,
    }

    this.props.dispatch({
      type: 'dataset/searchItem',
      payload: keywords
    });
  }

  handleReset = () => {
    this.props.dispatch({
      type: 'dataset/reset',
    });
  }

  render() {
    return (
      <Form>
        <Form.Item label="productId" name="productId">
          <Input onChange = {(e) => this.setState({productId: e.target.value})}/>
        </Form.Item>
        <Form.Item label="productName" name="productName">
          <Input onChange = {(e) => this.setState({productName: e.target.value})}/>
        </Form.Item>
        <Form.Item label="createTime" name="createTime">
          <Input onChange = {(e) => this.setState({createTime: e.target.value})}/>
        </Form.Item>
        <Form.Item label="personInCharge" name="personInCharge">
          <Input onChange = {(e) => this.setState({personInCharge: e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={this.handleSearch}>
            Search
          </Button>
          <Button htmlType="button" onClick={this.handleReset}>
            Reset
          </Button>
          <CreateNewData dataSource ={this.props.dataSource} dispatch = {this.props.dispatch}/>
        </Form.Item>
      </Form>
    );
  }
}

function Display(props) {
  function handleDelete(id) {
    console.log('handleDelete id', id)
    props.dispatch({
      type: 'dataset/delete',
      payload: id
    });
  }

  const columns = [
    {
      title: 'productId',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'productName',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'personInCharge',
      dataIndex: 'personInCharge',
      key: 'personInCharge',
    },
    {
      title: 'productIntro',
      dataIndex: 'productIntro',
      key: 'productIntro',
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Button> Edit </Button>
          <Button onClick={() => handleDelete(record.productId)}> Delete </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.dataSource.showItems}
      />
    </div>
  );
}

function mainPage(props) {
  return(
    <>
      <Search dispatch={props.dispatch}/>
      <Display dataSource={props.dataset} dispatch={props.dispatch}/>
    </>
  );
}

export default connect(({ dataset }) => {
  return {
    dataset
  };
})(mainPage);