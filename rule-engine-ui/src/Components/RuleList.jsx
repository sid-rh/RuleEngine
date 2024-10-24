import React,{ useState } from 'react';
import Tree from './Tree';

const RuleList = ({ rules, onSelect,onDelete }) => {
  const [expandedRule, setExpandedRule] = useState(null);

  const handleExpand = (rule) => {
    setExpandedRule(expandedRule?._id === rule._id ? null : rule);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Existing Rules</h2>
      {rules.length === 0 ? (
        <p className="text-gray-500">No rules created yet.</p>
      ) : (
        <ul className="space-y-4">
          {rules.map((rule) => (
            <li key={rule._id} className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{rule.name}</div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleExpand(rule)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    {expandedRule?._id === rule._id ? 'Hide' : 'Show'} AST
                  </button>
                  <button
                    onClick={() => onSelect(rule)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Evaluate
                  </button>
                  <button
                    onClick={() => onDelete(rule._id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {rule.ruleString}
              </div>
              {expandedRule?._id === rule._id && (
                <Tree ast={rule.ast} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RuleList;