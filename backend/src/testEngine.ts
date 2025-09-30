import ChimeraEngine, { TestCase } from "./engine/chimeraEngine.js";

const tc: TestCase = {
  initialStateId: "onboarding",
  input: "input de teste",
  expectedResult: "expected"
};

const engine = new ChimeraEngine("liabuilderwadev-5.json", [tc]);

engine.run();
