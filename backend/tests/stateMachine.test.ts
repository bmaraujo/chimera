import { describe, it, expect } from "vitest";
import StateMachine from "../src/engine/stateMachine.js";

describe("StateMachine", () => {
    
    it("deve lançar erro se flow for inválido", () => {
        const sm = new StateMachine(null as any);
        expect(() => sm.run("Inicial", "input", "expected")).toThrowError();
    });

    it("deve retornar falso se o estado experado não for configurado corretamente", () => {
        const fakeFlow = {
            "flow": {
                "onboarding": {
                    "$contentActions": [],
                    "$conditionOutputs": [
                        {
                            "stateId": "2c7eafc5-3214-4843-9aa3-55da9563cab8",
                            "typeOfStateId": "state",
                            "$connId": "con_8",
                            "$id": "4cb7bf3a-9b51-4caf-bf48-2f3ddfebdfca",
                            "conditions": [
                                {
                                    "source": "input",
                                    "comparison": "equals",
                                    "values": [
                                        "sair",
                                        "encerrar",
                                        "finalizar"
                                    ]
                                }
                            ],
                            "$isBuilderDefaultOutput": true,
                            "$invalid": false
                        }],
                    "$enteringCustomActions": [],
                    "$leavingCustomActions": [],
                    "$inputSuggestions": [],
                    "$defaultOutput": {
                        "stateId": "0842e23b-3002-43e9-acd6-53f6586c68b2",
                        "$invalid": false,
                        "typeOfStateId": "state"
                    },
                    "isAiGenerated": false,
                    "id": "onboarding",
                    "root": true,
                    "$title": "Início",
                }
            }
        }; // flow mockado
        const sm = new StateMachine(fakeFlow);

        const result = sm.run("onboarding", "input de teste", "expected");
        expect(result).toBe(false);
    });

    it("deve retornar true se o o resultado for o esperado", () =>{
         const fakeFlow = {
            "flow": {
                "onboarding": {
                    "$contentActions": [],
                    "$conditionOutputs": [
                        {
                            "stateId": "2c7eafc5-3214-4843-9aa3-55da9563cab8",
                            "typeOfStateId": "state",
                            "$connId": "con_8",
                            "$id": "4cb7bf3a-9b51-4caf-bf48-2f3ddfebdfca",
                            "conditions": [
                                {
                                    "source": "input",
                                    "comparison": "equals",
                                    "values": [
                                        "sair",
                                        "encerrar",
                                        "finalizar"
                                    ]
                                }
                            ],
                            "$isBuilderDefaultOutput": true,
                            "$invalid": false
                        }],
                    "$enteringCustomActions": [],
                    "$leavingCustomActions": [],
                    "$inputSuggestions": [],
                    "$defaultOutput": {
                        "stateId": "0842e23b-3002-43e9-acd6-53f6586c68b2",
                        "$invalid": false,
                        "typeOfStateId": "state"
                    },
                    "isAiGenerated": false,
                    "id": "onboarding",
                    "root": true,
                    "$title": "Início",
                }
            }
        }; // flow mockado
        const sm = new StateMachine(fakeFlow);

        const result = sm.run("onboarding", "encerrar", "0842e23b-3002-43e9-acd6-53f6586c68b2");
        expect(result).toBe(true);
    });
});
