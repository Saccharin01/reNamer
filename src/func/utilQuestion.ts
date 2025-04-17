import readline from "readline";

/**
 * 프로젝트 공통으로 사용할 리드라인 인터페이스
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



/**
 * @param question 리드라인 인터페이스에서 사용자에게 질문하는 스크립트
 * @returns 프로미스 반환
 */

const utilQuestion = (question: string): Promise<string> => {

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

export {utilQuestion, rl}
