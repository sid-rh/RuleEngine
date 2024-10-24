import React, { useState } from 'react'

const RuleForm = ({ onSubmit }) => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name: ruleName, ruleString });
      setRuleName('');
      setRuleString('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="Rule Name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Rule String"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Create Rule</button>
      </form>
    );
}

export default RuleForm;