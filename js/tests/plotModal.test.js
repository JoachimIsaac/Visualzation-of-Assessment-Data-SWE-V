
let { getErrorResponse400, getErrorResponse500, isValid400Error, isValid500Error } = require('../testingFunctions');



test('getErrorResponse400 function on response 500', () => {
  expect(getErrorResponse400(500)).toStrictEqual('');
});


test('getErrorResponse400 function on response 401', () => {
 expect(getErrorResponse400(401)).toStrictEqual('401 Unauthorized – client failed to authenticate with the server');
});

test('getErrorResponse400 function on response 403', () => {
  expect(getErrorResponse400(403)).toStrictEqual('403 Forbidden – client authenticated but does not have permission to access the requested resource');

});


test('getErrorResponse400 function on response 404', () => {
  expect(getErrorResponse400(404)).toStrictEqual('404 Not Found – the requested resource does not exist')
});


test('getErrorResponse400 function on response 412', () => {
  expect(getErrorResponse400(412)).toStrictEqual('412 Precondition Failed – one or more conditions in the request header fields evaluated to false');
});


test('getErrorResponse400 function on response 200', () => { 
  expect(getErrorResponse400(200)).toStrictEqual('');
})


test('getErrorResponse400 function on response 300', () => { 
  expect(getErrorResponse400(300)).toStrictEqual('');
})


test('getErrorResponse400 function on response 400', () =>{ 
  expect(getErrorResponse400(400)).toStrictEqual(`400 Bad Request – client sent an invalid request, such as lacking required request body or parameter`);
})


test('getErrorResponse500 function on response 500', () => {

  expect(getErrorResponse500(500)).toStrictEqual(`500 Internal Server Error – a generic error occurred on the server`);
});


test('getErrorResponse500 function on response 503', () => {

  expect(getErrorResponse500(503)).toStrictEqual(`503 Service Unavailable – the requested service is not available`);
});


test('getErrorResponse500 function on response 400', () => {

  expect(getErrorResponse500(400)).toStrictEqual("");
});


test('getErrorResponse500 function on response 600', () => {

  expect(getErrorResponse500(600)).toStrictEqual("");
});


test('getErrorResponse500 function on response 200', () => {

  expect(getErrorResponse500(200)).toStrictEqual("");
});

