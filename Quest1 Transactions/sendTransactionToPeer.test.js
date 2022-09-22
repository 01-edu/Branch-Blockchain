let assert = require('assert');
const { expect } = require("chai");
let {tx} = require('./sendTransactionToPeer.sl.js');

function isSha256(h) {
    const regex = /^[a-f0-9]{64}$/gi
    return regex.test(h)
}  

describe('Send transaction', function () {
  it('Should return a valid txid', function () {
    assert.ok(isSha256(tx.txid));
  });

  it('Should return a valid date', function () {
    let currentDate = Math.round(new Date().getTime()/1000)// in seconds
    assert.ok(Math.abs(currentDate - tx.time) < 172800) // 48h max delay
  });

  it('Should return a valid amount', function () {
    assert.ok(tx.amount == -0.00001337);
  });
});
