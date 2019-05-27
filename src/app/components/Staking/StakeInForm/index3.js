import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { BigNumber } from 'bignumber.js';
import { Button, Modal, Form, Input, Icon, Select, InputNumber, message, Row, Col } from 'antd';
import Validator from '../Validators/Validator';
import './index.less';
import validatorImg from 'static/image/validator.png';

@inject(stores => ({
  getAddrList: stores.wanAddress.getAddrList,
}))

@observer
class StakeInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: "0",
      addrList: [],
    }
  }

  componentWillMount() {
    const { getAddrList } = this.props;
    let addrList = []
    getAddrList.forEach(addr => {
      addrList.push(
        addr.address
      )
    });
    this.setState({addrList: addrList})
  }

  componentWillUnmount() {
    
  }

  onChange = value => {
    const { getAddrList } = this.props;
    for (let i = 0; i < getAddrList.length; i++) {
      const element = getAddrList[i];
      if (element.address == value) {
        this.setState({balance: element.balance})
      }
    }
  }

  render() {
    let validatorList = []
    validatorList.push(
      (<Validator img={validatorImg} name="Ethereum" />)
    )
    return (
      <div className="stakein">
        <Modal
          visible
          destroyOnClose={true}
          closable={false}
          title="Delegate Now"
          onCancel={this.props.onCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.props.onSend}>Send</Button>,
            <Button key="back" className="cancel" onClick={this.props.onCancel}>Cancel</Button>,
          ]}

          className="stakein-modal"
        >
          <div className="stakein-bg">
            <div className="stakein-title">Validator's Account:</div>
            <div className="stakein-line">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><span className="stakein-name">Name</span></Col>
                <Col span={16}>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: 355 }}
                    placeholder="Select a FROM name"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {validatorList.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                  </Select>

                </Col>
                <Col span={4}>
                  <a>More Info</a>
                </Col>
              </Row>
            </div>
            <div className="stakein-line">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><span className="stakein-name">Address</span></Col>
                <Col span={20}><Input placeholder="Please enter address" /></Col>
              </Row>
            </div>
          </div>
          <div className="stakein-bg">
            <div className="stakein-title">My Account:</div>
            <div className="stakein-line">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><span className="stakein-name">Stake</span></Col>
                <Col span={16}><Input placeholder="Please enter stake amount" /></Col>
                <Col span={4}><span className="stakein-addr">WAN</span></Col>
              </Row>
            </div>
            <div className="stakein-line">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={5}><span className="stakein-name">Balance</span></Col>
                <Col span={19}><span className="stakein-addr">{this.state.balance} WAN</span></Col>
              </Row>
            </div>
            <div className="stakein-line">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><span className="stakein-name">Address</span></Col>
                <Col span={20}>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: 355 }}
                    placeholder="Select a FROM address"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {this.state.addrList.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default StakeInForm;