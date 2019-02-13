'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  shopHost: {
    url: '"/hn-shop-web"'
  },
  businessHost: {
    url: '"/hn-shop-web"',
    host: '"http://shop.51myd.com"',
    projectName: '"hn_shop"'
  },
  adminHost: {
  	url: '""'
  }
})
