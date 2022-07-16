import { getDefaultOwner } from './6-6.js';
import { getDefaultOwner2 } from './6-6.js';


const owner = getDefaultOwner();
owner.firstName = '다비드';
console.log(owner); // firstName: '다비드'
console.log(getDefaultOwner());  // firstName: '마틴'


const owner2 = getDefaultOwner2();
// owner2는 클래스를 반환하고 getter()만 제공되기 때문에 수정이 불가함
//owner2.firstName = '다비드'; 

console.log('person > ', owner2.toString());
