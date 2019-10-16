/* eslint-disable */
import Vue from 'vue'

const transactionShortFiles = require.context('~/components/transactions/short', true, /\.vue$/);
const transactionShortComponents = {};
transactionShortFiles.keys().forEach(key => {
  transactionShortComponents[key.replace(/(\.\/|\.vue)/g, '')] = transactionShortFiles(key).default;
});
Object.keys(transactionShortComponents).forEach(key => {
  Vue.component(`${key}Short`, transactionShortComponents[key]);
});



const transactionFullFiles = require.context('~/components/transactions/full', true, /\.vue$/);
const transactionFullComponents = {};
transactionFullFiles.keys().forEach(key => {
  transactionFullComponents[key.replace(/(\.\/|\.vue)/g, '')] = transactionFullFiles(key).default;
});
Object.keys(transactionFullComponents).forEach(key => {
  Vue.component(`${key}Full`, transactionFullComponents[key]);
});



const receiptFiles = require.context('~/components/receipts', true, /\.vue$/);
const receiptComponents = {};
receiptFiles.keys().forEach(key => {
  receiptComponents[key.replace(/(\.\/|\.vue)/g, '')] = receiptFiles(key).default;
});
Object.keys(receiptComponents).forEach(key => {
  Vue.component(`${key}`, receiptComponents[key]);
});
