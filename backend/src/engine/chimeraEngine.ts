import fileLoader from "../utils/fileLoader.js";
import StateMachine from "./stateMachine.js";

export interface TestCase {
  initialStateId: string;
  input: string;
  expectedResult: string;
  result?: boolean;
}

export default class ChimeraEngine {
  private machine: StateMachine;
  private testCases: TestCase[];

  constructor(filePath: string, testCases: TestCase[]) {
    const flow = fileLoader(filePath);
    this.machine = new StateMachine(flow);
    this.testCases = testCases;
  }

  run(): void {
    if (!this.machine) throw new Error("Invalid flow.");
    if (!this.testCases) throw new Error("No test cases found.");

    for (const tc of this.testCases) {
      const result = this.machine.run(tc.initialStateId, tc.input, tc.expectedResult);
      tc.result = result;
    }
  }
}
