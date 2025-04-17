import fs from "fs";
import path from "path";
import natsort from "natsort";

/**
 * 매개변수로 전달된 targetDir을 이용해 디렉토리를 탐색하고 해당 디렉토리 내의 파일을 정렬하는 함수입니다.
 * @param targetDir 사용자가 입력하는 디렉토리의 이름 혹은 디렉토리의 경로입니다.
 * @param nameSpace 몇 자리 숫자로 처리할 지 사용자의 입력을 필요로 하는 매개변수입니다. 4를 입력할 시 네 자리 숫자로 라벨링 됩니다.
 * @returns Void
 */
const fileNameSort = (targetDir: string, nameSpace: number): void => {
  const dir = fs.readdirSync(targetDir);
  const fileList = dir.filter((file) =>
    fs.statSync(path.join(targetDir, file)).isFile()
  );

  if (fileList.length === 0) {
    console.log(
      `[${path.basename(targetDir)}] 이름을 변경할 파일이 존재하지 않습니다.`
    );
    return;
  }

  const sorter = natsort({ insensitive: true });

  fileList.sort((a, b) => sorter(a, b));

  fileList.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${String(index + 1).padStart(nameSpace, "0")}${ext}`;
    const oldPath = path.join(targetDir, file);
    const newPath = path.join(targetDir, newName);

    fs.renameSync(oldPath, newPath);
    console.log(`✔️ [${path.basename(targetDir)}] ${file} → ${newName}`);
  });
};

export default fileNameSort