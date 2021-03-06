import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import Pretender from 'pretender';

let server;

moduleForAcceptance('Acceptance | index', {
  beforeEach() {
    server = new Pretender();
  },
  afterEach() {
    server.shutdown();
  }
});

test('visiting /', function(assert) {
  visit('/');
  assert.expect(4);
  server.put('/fruits/:id/doRipen', (request) => {
    let data = JSON.parse(request.requestBody);
    assert.deepEqual(data, { id: '1', name: 'apple' }, 'member action - request payload is correct');
    assert.equal(request.url, '/fruits/1/doRipen', 'request was made to "doRipen"');
    return [200, { }, '{"status": "ok"}'];
  });

  server.put('/fruits/ripenEverything', (request) => {
    let data = JSON.parse(request.requestBody);
    assert.deepEqual(data, { test: 'ok' }, 'collection action - request payload is correct');
    assert.ok(true, 'request was made to "ripenEverything"');
    return [200, { }, '{"status": "ok"}'];
  });

  andThen(function() {
    click('#apple .ripen-instance-button');
  });

  andThen(function() {
    click('.all-fruit .ripen-type-button');
  });

});

