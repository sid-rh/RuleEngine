import React from 'react'
import TreeNode from './TreeNode';

const Tree = ({ ast }) => {
    if (!ast) return null;

    return (
      <div className="border rounded p-4 mt-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">AST Visualization</h3>
        <TreeNode node={ast} />
      </div>
    );
}

export default Tree