import { RuleConditionEngine, Condition, EvaluationContext } from "./ruleConditionEngine.js";

export default class StateMachine {
  private readonly ruleEngine: RuleConditionEngine;
  private flow: any;

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
    for(const conditionOutput of state["$conditionOutputs"]){
      for(const condition of conditionOutput.conditions){
        console.log(`first condition: ${JSON.stringify(condition)}`);
        let cond: Condition = { source: condition.source, comparison: condition.comparison, values: condition.values};
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
