import { fileLoader } from "../utils/fileLoader";
import {StateMachine} from "./stateMachine";

class ChimeraEngine{
    /**
     *
     */
    constructor(filePath, testCases) {
        let flow = fileLoader(filePath);
        this.machine = new StateMachine(flow);
        this.testCases = testCases;
    }

    run(){
        if(!this.machine){
            throw new Error("Invalid flow.");
        }
        if(!this.testCases){
            throw new Error("No test cases found.");
        }
        for(const tc of this.testCases){
            const result = this.machine.run(tc.initialStateId, tc.input, tc.expectedResult);
            tc.result = result;
        }
    }
    
}

export default ChimeraEngine;