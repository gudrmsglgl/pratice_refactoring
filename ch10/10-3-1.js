export function payAmount(employee) {
  if (employee.isSeparated) {
    return { amount: 0, reasonCode: 'SEP' };
  }
  
  if (employee.isRetired) {
    return { amount: 0, reasonCode: 'RET' };
  }
  
  return someRetiredComputation();
}

function someRetiredComputation() {
  return { amount: 0, reasonCode: 'RET' };
}