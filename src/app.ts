import path from "path";
import { utilQuestion, rl } from "./func/utilQuestion";
import fileNameSortRecursive from "./func/fileNameSortRecursive";

async function mainLoop(): Promise<void> {
  while (true) {
    const dirInput = await utilQuestion("📁 디렉토리 경로를 입력하세요 (종료하려면 'exit' 또는 'e' 입력): ");
    if (dirInput.toLowerCase() === "exit" || dirInput.toLowerCase() === "e") {
      rl.close();
      break;
    }

    const resolvedPath = path.resolve(dirInput);
    let parsed: number = 1;

    while (true) {
      const digitInput = await utilQuestion("자릿수를 입력하세요 (기본값 1, 1 ~ 9): ");
    
      if (digitInput === "") break;

      const parsedNum = parseInt(digitInput, 10);
      if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= 9) {
        parsed = parsedNum;
        break;
      } else {
        console.log("유효하지 않은 숫자입니다. 다시 입력해주세요.");
      }
    }

    console.clear();
    console.log(`\n  경로: ${resolvedPath}\n`);
    console.log(`  자릿수: ${parsed}자리\n\n`);

    // 조건 변수 설정
    let shouldRestart = false;

    while (true) {
      const pressToStart = await utilQuestion("입력 내용이 올바른가요? 'n'을 입력하면 처음부터 다시 시작합니다. (Enter = 계속 진행): ");
      const normalized = pressToStart.trim().toLowerCase();
    
      if (normalized === "n") {
        console.log("처음부터 다시 입력을 시작합니다.\n");
        shouldRestart = true;
        break; // 현재 확인 루프만 빠져나감
      }

      if (normalized !== "") {
        console.clear();
        console.log("잘못된 입력입니다. 'n' 또는 Enter만 입력 가능합니다.\n");
        continue;
      }

      // ✅ 올바른 입력: 빈 문자열(Enter)
      fileNameSortRecursive(resolvedPath, parsed);
      break;
    }

    if (shouldRestart) continue; // ✅ mainLoop 처음부터 다시 시작
  }
}

mainLoop();