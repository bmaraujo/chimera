export type Condition = {
  source: "input" | "context";
  comparison: "equals" | "notEquals" | "exists" | "notExists" | "greaterThan" | "contains";
  values: string[];
  variable?: string;
};

export type EvaluationContext = {
  input: Record<string, any>;
  context: Record<string, any>;
};

export class RuleConditionEngine {
  private operators: Record<string, (left: any, right: any[]) => boolean>;

  constructor() {
    this.operators = {
      equals: (left, right) => right.includes(left),
      notEquals: (left, right) => !right.includes(left),
      exists: (left) => left !== undefined && left !== null,
      notExists: (left) => left === undefined || left === null,
      greaterThan: (left, right) => {
        const num = Number(left);
        const target = Number(right[0]);
        return !isNaN(num) && num > target;
      },
      contains: (left, right) => {
        if (typeof left !== "string") return false;
        return right.some((val) => left.includes(val));
      },
    };
  }

  private resolveValue(condition: Condition, ctx: EvaluationContext): any {
    if (condition.source === "input") {
      return condition.variable
        ? ctx.input[condition.variable]
        : ctx.input["content"] ?? ctx.input;
    }

    if (condition.source === "context") {
      return condition.variable ? ctx.context[condition.variable] : ctx.context;
    }

    return undefined;
  }

  public evaluateCondition(condition: Condition, ctx: EvaluationContext): boolean {
    console.log(`condition:${JSON.stringify(condition)}`);
    const left = this.resolveValue(condition, ctx);
    console.log(`left: ${left}, comparison:${condition.comparison}`);
    const operatorFn = this.operators[condition.comparison];

    if (!operatorFn) {
      throw new Error(`Operador não suportado: ${condition.comparison}`);
    }

    return operatorFn(left, condition.values);
  }

  public evaluateConditions(conditions: Condition[], ctx: EvaluationContext): boolean {
    return conditions.every((cond) => this.evaluateCondition(cond, ctx));
  }

  public addOperator(name: string, fn: (left: any, right: any[]) => boolean) {
    this.operators[name] = fn;
  }
}
