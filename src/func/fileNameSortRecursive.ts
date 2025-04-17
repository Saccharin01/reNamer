import fileNameSort from "./fileNameSort"
import fs from "fs"
import path from "path"

const fileNameSortRecursive = (basePath : string, nameSpace: number) => {
  if (!fs.existsSync(basePath)) {
    console.clear();
    console.error(`경로 "${basePath}"가 존재하지 않습니다.`);
    return;
  }

  if (!fs.statSync(basePath).isDirectory()) {
    console.clear();
    console.error(`경로 "${basePath}"는 디렉토리가 아닙니다.`);
    return;
  }

  fileNameSort(basePath,nameSpace);

  const children = fs.readdirSync(basePath);
  children.forEach((childName) => {
    const fullPath = path.join(basePath, childName);
    if (fs.statSync(fullPath).isDirectory()) {
      fileNameSortRecursive(fullPath,nameSpace);
    }
  });
};

export default fileNameSortRecursive