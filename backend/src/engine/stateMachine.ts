/* eslint-disable perfectionist/sort-objects */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
import { Condition,  EvaluationContext, RuleConditionEngine } from "./ruleConditionEngine.js";

export default class StateMachine {
  private flow: any;
  private readonly ruleEngine: RuleConditionEngine;

  constructor(flow: any) {
    this.flow = flow;
    this.ruleEngine = new RuleConditionEngine();
  }

  run(initialStateId: string, input: string, expectedResult: string): boolean {
    if(!this.flow){
      throw new Error("Flow is null");
    }
   
    return this.executeOutputConditions(initialStateId,input,{});
  }

  private executeOutputConditions(stateId: string, input: string, variables: Record<string, any>): boolean{
    const state = this.flow.flow[stateId];
    let result = false;
    console.log(state);
    for(const conditionOutput of state["$conditionOutputs"]){
      
      for(const condition of conditionOutput.conditions){
        console.log(`first condition: ${JSON.stringify(condition)}`);
        const cond: Condition = { source: condition.source, comparison: condition.comparison, values: condition.values};
        console.log(`Condition translated:${JSON.stringify(cond)}`);
        if(condition.source == "context"){
          cond.variable = condition.variable;
        }
            
        const ctx: EvaluationContext = {
          input: { content: input },
          context: {},
        };
        if(condition.source == "context"){
          ctx.context[condition.variable]= variables[condition.variable];
        }
  
        result = result || this.ruleEngine.evaluateCondition(cond, ctx)
      }
    }
    return result;
  }


}
