import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Card from './Card'
import './index.less';
import { observer, inject } from 'mobx-react';
import intl from 'react-intl-universal';

@inject(stores => ({
  language: stores.languageIntl.language,
  stakeInfo: stores.staking.stakeInfo,
}))

@observer
class Cards extends Component {
  render() {
    let stakeBottom = intl.get('staking.inValidators1') + this.props.stakeInfo.validatorCnt + intl.get('staking.inValidators2');
    if (this.props.language === 'en_US' && Number(this.props.stakeInfo.validatorCnt) !== 1) {
      stakeBottom += 's';
    }

    return (
      <div className="cards">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="card1"
              title={intl.get('staking.myStake')}
              value={this.props.stakeInfo.myStake}
              tail="WAN"
              bottom={stakeBottom}
            />
          </Col>
          <Col span={6}>
            <Card className="card2"
              title={intl.get('staking.totalReward')}
              value={this.props.stakeInfo.totalDistributedRewards}
              tail="WAN"
              bottom={intl.get('staking.startFrom1') + this.props.stakeInfo.startFrom + intl.get('staking.startFrom2')}
            />

          </Col>
          <Col span={6}>
            <Card className="card3"
              title={intl.get('staking.rewardRate')}
              value={this.props.stakeInfo.currentRewardRate}
              // tail={this.props.stakeInfo.currentRewardRateChange}
              bottom={this.props.stakeInfo.epochEndTime}
            />
          </Col>
          <Col span={6}>
            <Card className="card4"
              title={intl.get('staking.pending')}
              value={this.props.stakeInfo.pendingWithdrawal}
              tail="WAN"
              bottom={this.props.stakeInfo.currentTime}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cards