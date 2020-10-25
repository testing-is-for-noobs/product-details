import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    // { duration: '10s', target: 5 },
    { duration: '2m', target: 100 }, // below normal load
    { duration: '2m', target: 100 },
    // { duration: '2m', target: 200 }, // normal load
    { duration: '2m', target: 500 },
    // { duration: '2m', target: 300 }, // around the breaking point
    { duration: '2m', target: 500 },
    // { duration: '2m', target: 400 }, // beyond the breaking point
    // { duration: '2m', target: 400 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:8888'; // make sure this is not production

  // let responses =  http.get(`${BASE_URL}/review/1`);
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/nearbyWithInventory/12/95148`,
      null,
      { tags: { name: 'Nearby With Inventory' } },
    ],
    [
      'GET',
      `${BASE_URL}/product/2`,
      null,
      { tags: { name: 'Product' } },
    ],
    [
      'GET',
      `${BASE_URL}/store/3`,
      null,
      { tags: { name: 'Store' } },
    ],
  ]);

  sleep(1);
}
