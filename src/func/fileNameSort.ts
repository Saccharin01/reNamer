import fs from "fs";
import path from "path";

/**
 *매개변수로 전달된 targetDir을 이용해 디렉토리를 탐색하고 해당 디렉토리 내의 파일을 정렬하는 함수입니다.
 * @param targetDir 사용자가 입력하는 디렉토리의 이름 혹은 디렉토리의 경로입니다.
 * @param nameSpace 몇 자리 숫자로 처리할 지 사용자의 입력을 필요로 하는 매개변수입니다. 4를 입력할 시 네 자리 숫자로 라벨링 됩니다.
 * @returns Void
 */

export const fileNameSort = (targetDir: string, nameSpace: number): void => {
  
  const dir = fs.readdirSync(targetDir)
  const fileList = dir.filter((file) => fs.statSync(path.join(targetDir, file)).isFile());

  if (fileList.length === 0) {
    console.log(
      `[${path.basename(targetDir)}] 이름을 변경할 파일이 존재하지 않습니다.`
    );
    return;
  }

  //! 파일이 꼭 숫자로만 이뤄진 것도 아닐것.
  /**
   * todo 예를 들어, a123-1, a123-10, a112-1, a101-0, 100a-00, 101a-01, a123-2 이런 파일이 존재할 때, 아래의 함수는 내가 의도하는 정렬을 수행할 수 없을 것.
   * todo 위 예시에서 나는 100a-00, 101a-01, a101-0, a112-1, a123-1, a123-2, a123-10 처럼 정렬된 다음 파일 이름이 변경되길 희망함.
   */

  //? 자연정렬?

  const getNumber = (filename: string): number => {
    const baseName = path.basename(filename, path.extname(filename));
    const match = baseName.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  fileList.sort((a, b) => getNumber(a) - getNumber(b));

  fileList.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${String(index + 1).padStart(nameSpace, "0")}${ext}`;
    const oldPath = path.join(targetDir, file);
    const newPath = path.join(targetDir, newName);

    fs.renameSync(oldPath, newPath);
    console.log(`✔️ [${path.basename(targetDir)}] ${file} → ${newName}`);
  });
};
