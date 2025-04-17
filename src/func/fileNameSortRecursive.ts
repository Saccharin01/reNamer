import fileNameSort from "./fileNameSort"
import fs from "fs"
import path from "path"

const fileNameSortRecursive = (basePath : string, nameSpace: number) => {
  if (!fs.existsSync(basePath)) {
    console.error(`❌ 경로 "${basePath}"가 존재하지 않습니다.`);
    return;
  }

  if (!fs.statSync(basePath).isDirectory()) {
    console.error(`❌ 경로 "${basePath}"는 디렉토리가 아닙니다.`);
    return;
  }

  // 1. 현재 디렉토리의 파일 리네이밍
  fileNameSort(basePath,nameSpace);

  // 2. 하위 디렉토리 순회
  const children = fs.readdirSync(basePath);
  children.forEach((childName) => {
    const fullPath = path.join(basePath, childName);
    if (fs.statSync(fullPath).isDirectory()) {
      fileNameSortRecursive(fullPath,nameSpace); // 🔁 재귀 호출
    }
  });
};

export default fileNameSortRecursive