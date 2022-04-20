export const error = function (err,msg) {
  const rules =  {
    required: true,
    message: err[msg],
    trigger: 'blur',
  }
  return rules;
};
