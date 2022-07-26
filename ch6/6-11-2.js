import fs from 'fs';

// 1. run 함수를 만들어서 노드의 process 디펜던시를 제거한다. => 의존성 제거
// 2. 사용자의 입력을 받아옴 -> 유효성 검사
// 3. 필요한 로직을 처리
run(process.argv);

function run(args) {
  const command = parseCommand(args);
  countOrders(command);
}

function parseCommand(args) {
  if (!args[2]) {
    throw new Error('파일 이름을 입력하세요');
  }
  
  const fileName = getJosnFileName();
  const isReadOnly = args.includes('-r');

  // 오브젝트에서 key, value 가 같다면 => 하나로 표시 가능
  return {
    fileName,
    isReadOnly
  }
}

// 파라미터를 오브젝트 형태로 선언하면 중복코드 제거(command.XXX) 가능 
function countOrders({ fileName, isReadOnly }) {
  const rawData = fs.readFileSync(fileName);
  const orders = JSON.parse(rawData);
  const filteredOrder = isReadOnly 
    ? orders.filter((order) => order.status === 'ready') 
    : orders;
  console.log(filteredOrder.length);
}


function getJosnFileName() {
  const fileName = `./${process.argv[2]}.json`;
  if (!fs.existsSync(fileName)) {
    throw new Error('파일이 존재하지 않습니다');
  }

  return fileName;
}
