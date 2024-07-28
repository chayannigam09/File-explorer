import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileTree from './FileTree';
import FileView from './FileView';
import { mockFileSystem } from '../mockData';
import '../styles.css';

const FileExplorer = () => {
  const fileSystem = useSelector((state) => state.fileSystem);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedFile) {
      setSelectedFile((prevFile) => ({
        ...selectedFile,
        content: prevFile.content,
      }));
    }
  }, [fileSystem]);

  const handleFileClick = (file) => {
    if (!file.isFolder) setSelectedFile(file);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTree = (node) => {
    if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return node;
    }
    if (node.children) {
      const filteredChildren = node.children.map(filteredTree).filter(Boolean);
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
    }
    return null;
  };

  return (
    <div className="file-explorer">
      <div className="file-tree">
        {/* <input
          type="text"
          className="search-bar"
          placeholder="Search files and folders"
          value={searchQuery}
          onChange={handleSearch}
        /> */}
        <FileTree node={filteredTree(fileSystem) || mockFileSystem} onFileClick={handleFileClick} />
      </div>
      <div className="file-view">
        <FileView selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default FileExplorer;
