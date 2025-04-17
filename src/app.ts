import path from "path";
import { utilQuestion, rl } from "./func/utilQuestion";
import filenameSortRecursive from "./func/filenameSortRecursive";

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
    
      if (digitInput === "") {
        break;
      }
    
      const parsedNum = parseInt(digitInput, 10);
      if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= 9) {
        parsed = parsedNum;
        break;
      } else {
        console.log("❌ 유효하지 않은 숫자입니다. 다시 입력해주세요.");
      }
    }

    console.clear()

    console.log(`\n  경로: ${resolvedPath}\n`);
    console.log(`  자릿수: ${parsed}자리\n\n`);

    const pressToStart = await utilQuestion(
      "입력 내용이 올바른가요? 잘못되었으면 'n'을 입력해 처음부터 다시 시작하세요. (Enter = 계속 진행): "
    );

    if (pressToStart.toLowerCase() === "n") {
      console.clear()
      console.log("처음으로 돌아갑니다.\n");
      continue;
    }

    filenameSortRecursive(resolvedPath, parsed);
  }
}

mainLoop();
