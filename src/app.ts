/**
 * todo
 * 엔트리 파일. 이 파일에서는 모듈화 된 함수들을 모아 의도된 기능을 수행할 수 있도록 한다.
 */

import rl from "readline";
import path from "path";

const readLineInterface = rl.createInterface(
  {
    input : process.stdin,
    output : process.stdout
  }
)


function askDirectoryPath() {
  readLineInterface.question("디렉토리 경로를 입력하세요 (종료하려면 'exit' 입력): ", (inputPath) => {
    const trimmedPath = inputPath.trim().replace(/^"(.*)"$/, "$1");
    if (trimmedPath.toLowerCase() === "exit") {
      readLineInterface.close();
      return;
    }

    const resolvedPath = path.resolve(trimmedPath);

    askNameSpace(resolvedPath);
  });
}

function askNameSpace(resolvedPath: string) {
  readLineInterface.question("몇 자리 숫자로 지정하실건가요? 자릿수를 입력하세요 (1 ~ 9): ", (inputNum) => {
    const trimmed = inputNum.trim();
    const parsed = parseInt(trimmed);

    if (isNaN(parsed) || parsed <= 0 || 9 < parsed) {
      console.log("유효하지 않은 숫자입니다. 다시 입력해주세요.");
      return askNameSpace(resolvedPath);
    } 

    console.log(`경로 : ${resolvedPath}`);
    console.log(`${parsed}자리 숫자`);

    // fileNameSort(resolvedPath, parsed);

    // 다음 입력을 계속 받기 위해 다시 시작
    askDirectoryPath();
  });
}

// 시작
askDirectoryPath();
