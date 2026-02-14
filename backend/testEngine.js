import ChimeraEngine from "./src/engine/chimeraEngine.js";
const tc = {
    initialStateId: "Inicial",
    input: "",
    expectedResult: ""
};
const engine = new ChimeraEngine("liabuilderwadev-5.json", [tc]);
engine.run();
