import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFileContent } from '../redux/fileSystemSlice';
import MonacoEditor from './MonacoEditor';

const FileView = ({ selectedFile }) => {
  const dispatch = useDispatch();

  const handleSave = (newContent) => {
    dispatch(updateFileContent({ node: selectedFile, newContent }));
  };

  if (!selectedFile) return <div>Select a file to view its content.</div>;

  return (
    <div>
      {/* <h3>Viewing: {selectedFile.name}</h3> */}
      <MonacoEditor file={selectedFile} onSave={handleSave} />
    </div>
  );
};

export default FileView;
