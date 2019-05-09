import { walletCore } from 'wanchain-js-sdk';
import Logger from '~/src/utils/Logger'
import configService from './config'
import EventEmitter from 'events'

class WalletBackend extends EventEmitter {
    constructor(config) {
        super()
        this.logger = Logger.getLogger('walletBackend')
    }

    hdWalletDisconnectHandler(msg) {
        const { Windows } = require('../windows')
        Windows.broadcast('notification', 'hdwallet', msg)
    }
  
    async init(config) {
        this.config = Object.assign(configService.getConfig(), config)
        try {
            this.logger.info('start creating walletbackend')
            this.sdk = new walletCore(this.config)
            this.logger.info('start initing walletbackend')
            await this.sdk.init()
        } catch (e) {
            this.logger.error(e.message || e.stack) 
        }
        
        
        this.sdk.on('disconnect', this.hdWalletDisconnectHandler)
        this.sdk.on('probeloss', this.hdWalletDisconnectHandler)
        this.logger.info('added event listeners for hardware wallet')

        require('~/src/controllers')
        this.logger.info('finish initing walletbackend')
        this.emit('initiationDone')
    }
}

export default new WalletBackend()