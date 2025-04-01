import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {}

  response = http.put(
    'https://pizza-service.tsabmpizza.click/api/auth',
    '{"email":"test@test.com","password":"test"}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.tsabmpizza.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )
  check(response, { 'status equals 200': response => response.status.toString() === '200' })
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
    console.log(response.body);
    fail('Login was *not* 200');
  }

  vars['token'] = jsonpath.query(response.json(), '$.token')[0]

  sleep(4.1)

  response = http.get('https://pizza-service.tsabmpizza.click/api/order/menu', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
      origin: 'https://pizza.tsabmpizza.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.get('https://pizza-service.tsabmpizza.click/api/franchise', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"40-EPPawbPn0KtYVCL5qBynMCqA1xo"',
      origin: 'https://pizza.tsabmpizza.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(6.4)

  response = http.post(
    'https://pizza-service.tsabmpizza.click/api/order',
    '{"items":[{"menuId":2,"description":"Pepperoni","price":0.0042}],"storeId":"1","franchiseId":1}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.tsabmpizza.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )
  check(response, { 'status equals 200': response => response.status.toString() === '200' })
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
    console.log(response.body);
    fail('order was *not* 200');
  }

  vars ['jwt'] = jsonpath.query(response.json(), '$.jwt')[0]
  sleep(4)

  response = http.post(
    'https://pizza-factory.cs329.click/api/order/verify',
    //'{"jwt":"eyJpYXQiOjE3NDM0NjM2MDksImV4cCI6MTc0MzU1MDAwOSwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJzZWVnbWlsMiIsIm5hbWUiOiJUeWxlciBTZWVnbWlsbGVyIn0sImRpbmVyIjp7ImlkIjo0LCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9XSwic3RvcmVJZCI6IjEiLCJmcmFuY2hpc2VJZCI6MSwiaWQiOjE4fX0.kPSdLYM_BxdtCs2Cjw2j9A_Rksr8WQr2rPE8eBVEGTYc3Fw0BlZdp3x1_-H1_jilugENPMfNHGcv5vOXUsD5htRWcphXvTcO_I9-p2lKMLV6wrjQgPCY1-inEkWQ-lOPLIAJNLOGlqvKnenuvq-zJSvhrsQDnaGaYcwPtb9N00oCdKWjZqvm9eypFDRb5E0MITiVEcn7tYXGYMcvA4yDFBaIE_9XqTC6cJWf27XcI6j-6G-dYy3s7lXRQcXs0xGi-q-l_YHvat1-6BxT1n7otxwY8JbW4UjnF8Y8BHZuX1D_ClnwHpKQ8MSjJzPo7l70VVWQMpnATbBsSZRtMqMoF0x_CGN8RrOJ-4Krg5FhtTi2hsz__Ez3E9ko7P8Y4oCYqsvrFcsNuQiDzjk2BbFYQO_K4ME_nHhr_Iv4n7HD4NTLJkCk5jxZH2hrtT9syvUJ1byynhtdtEafnUM23q3IS1eLbMq1_805VPSPnsawcukOKAFWr5cYjTU1NQ5WpLDzHho8E0yOlSMLMwYT6z5c6rwA2WupOrejcGMyEAs1TiuLPyCYkISmsCmbYfDKFAmqGk9uc8yTYN0L3lluEXd-0QXMi61BCR8crC9KsGSl083R2a6DcknC1ipXkOzrgxuHZQKKMcQmTFQ0oz5FvqN3YO5Dh81tfF4JjjyKE7ZgK4Y"}',
    vars['jwt'],
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.tsabmpizza.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-storage-access': 'active',
      },
    }
  )
}