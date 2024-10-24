const Node = require('./Node');

const parse=(tokens)=>{
  let token = tokens.shift();
    
    if (token === '(') {
        let leftNode = parse(tokens);
        let operator = tokens.shift(); // Expect AND/OR
        let rightNode = parse(tokens);
        tokens.shift(); // Remove closing ')'
        return new Node('operator', leftNode, rightNode, operator);
    }
    
    if (token === ')') {
        return null; // End of a sub-expression
    }

    // Handle operand: age > 30 or department = 'Sales'
    let attribute = token;
    let operator = tokens.shift();
    let value = tokens.shift().replace(/['"]+/g, ''); // Remove quotes for strings
    return new Node('operand', null, null, { attribute, operator, value });
  
}

function createRule(ruleString) {
  
  const tokens = ruleString.match(/\(|\)|\w+|[<>=]+|\d+|'[^']*'/g);
  let index = -1;
  

  function parseExpression() {
    if (index==-1 || tokens[index] === '(') {
      index++;
      const left = parseExpression();
      const operator = tokens[index++];
      const right = parseExpression();
      index++; // Skip closing parenthesis
      return new Node('operator', operator, left, right);
    } else {
      const left = tokens[index++];
      const operator = tokens[index++];
      const right = tokens[index++];
      return new Node('operand', `${left} ${operator} ${right}`);
    }
  }

  return parseExpression(tokens);
}

function combineRules(rules) {
  // Implement logic to combine multiple rule ASTs
  // This is a simplified version that just combines with AND
  return rules.reduce((combined, rule) => {
    if (!combined) return createRule(rule);
    return new Node('operator', 'AND', combined, createRule(rule));
  }, null);
}

function evaluateRule(ast, data) {
  if (ast.type === 'operator') {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);
    return ast.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
  } else {
    // This is a simplified evaluation and doesn't handle all cases
    const [attribute, operator, value] = ast.value.split(' ');
    const dataValue = data[attribute];
    const compareValue = value.replace(/'/g, '');
    
    switch (operator) {
      case '=':
        return dataValue == compareValue;
      case '>':
        return dataValue > parseFloat(compareValue);
      case '<':
        return dataValue < parseFloat(compareValue);
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
}



module.exports = {
  createRule,
  combineRules,
  evaluateRule
};