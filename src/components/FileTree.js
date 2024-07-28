import React, { useState } from 'react';

const FileTree = ({ node, onFileClick }) => {
  const [expanded, setExpanded] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const toggleExpand = (nodeName) => {
    setExpanded((prev) => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  const renderTree = (node) => (
    <div key={node.name} className="tree-node">
         
      <div
        className="tree-item"
        onClick={() => node.isFolder ? toggleExpand(node.name) : onFileClick(node)}
        style={{ cursor: 'pointer' }}
      >
        {node.isFolder ? (expanded[node.name] ? '📂' : '📁') : '📄'} {node.name}
      </div>
      {node.isFolder && expanded[node.name] && (
        <div className="tree-children">
          {node.children.map((child) => renderTree(child))}
        </div>
      )}
    </div>
  );

  return <div className="file-tree">
    <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-3"
        />{renderTree(node)}</div>;
};

export default FileTree;
