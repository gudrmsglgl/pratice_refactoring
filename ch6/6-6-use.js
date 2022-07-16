import { getDefaultOwner } from './6-6.js';

const owner = getDefaultOwner();
owner.firstName = '다비드';
console.log(owner);
console.log(getDefaultOwner());
