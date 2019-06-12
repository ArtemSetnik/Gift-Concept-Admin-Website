module.exports.ResultProcess = function (res, callback, error) {
  if (res.result) {
    callback(res.data);
  } else {
    error(res.message);
  }
}
