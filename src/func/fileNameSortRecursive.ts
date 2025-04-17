import fileNameSort from "./fileNameSort";
import fs from "fs";
import path from "path";

/**
 * 루트 디렉토리 자체의 파일은 무시하고, 하위 디렉토리부터 재귀적으로 파일 이름을 변경합니다.
 * @param basePath 루트 경로
 * @param nameSpace 숫자 자리 수
 */
const fileNameSortRecursive = (basePath: string, nameSpace: number): void => {
  if (!fs.existsSync(basePath)) {
    console.clear();
    console.error(`경로 "${basePath}"가 존재하지 않습니다.\n`);
    return;
  }

  if (!fs.statSync(basePath).isDirectory()) {
    console.clear();
    console.error(`경로 "${basePath}"는 디렉토리가 아닙니다.\n`);
    return;
  }

  const children = fs.readdirSync(basePath);
  children.forEach((childName) => {
    const fullPath = path.join(basePath, childName);

    if (fs.statSync(fullPath).isDirectory()) {
      fileNameSort(fullPath, nameSpace);               // ✅ 하위 디렉토리 내 파일 리네이밍
      fileNameSortRecursive(fullPath, nameSpace);      // ✅ 재귀 탐색
    }
  });
};

export default fileNameSortRecursive;
