import React from 'react'

const TreeNode = ({ node, depth = 0 }) => {
    const indent = depth * 20;

    if (!node) return null;
  
    if (node.type === 'operator') {
      return (
        <div className="my-2">
          <div className="flex items-center" style={{ marginLeft: `${indent}px` }}>
            <div className="bg-blue-100 p-2 rounded border border-blue-300">
              {node.value}
            </div>
          </div>
          <TreeNode node={node.left} depth={depth + 1} />
          <TreeNode node={node.right} depth={depth + 1} />
        </div>
      );
    } else {
      return (
        <div 
          className="my-2 bg-green-100 p-2 rounded border border-green-300"
          style={{ marginLeft: `${indent}px` }}
        >
          {typeof node.value === 'string' 
            ? node.value 
            : `${node.value.left} ${node.value.operator} ${node.value.right}`}
        </div>
      );
    }
}

export default TreeNode