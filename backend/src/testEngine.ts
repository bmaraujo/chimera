import ChimeraEngine, { TestCase } from "./engine/chimeraEngine.js";

const tc: TestCase = {
  expectedResult: "expected",
  initialStateId: "onboarding",
  input: "input de teste"
};

const engine = new ChimeraEngine("liabuilderwadev-5.json", [tc]);

engine.run();
