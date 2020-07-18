/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/
// all test will pass for first 1 ip access
// if double ip counted test will fail for input likes are unknown

var chaiHttp = require('chai-http'); 
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
 
chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
      
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
         assert.equal(res.status, 200);
         assert.equal(res.body.stockData.symbol, 'GOOG');
         done();
        });
      })
     
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock:'goog', like:'true'})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.likes, 1); 
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock:'goog', like:'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.likes, 1);
          done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock:['aapl','apl']})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData);
          done();
        });
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock:['aapl', 'apl'], like:'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isNumber(res.body.stockData[0].rel_likes);
          done();
        });
      });
      
    });

});
