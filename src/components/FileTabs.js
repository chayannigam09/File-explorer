import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFileContent } from '../redux/fileSystemSlice';
import MonacoEditor from './MonacoEditor';

const FileTabs = () => {
  const [openedFiles, setOpenedFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const dispatch = useDispatch();

  const handleOpenFile = (file) => {
    // Check if the file is already opened
    if (!openedFiles.find(f => f.id === file.id)) {
      setOpenedFiles([...openedFiles, file]);
    }
    setActiveFileId(file.id);
  };

  const handleCloseFile = (fileId) => {
    setOpenedFiles(openedFiles.filter(file => file.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(null);
    }
  };

  const handleSave = (fileId, newContent) => {
    dispatch(updateFileContent({ fileId, newContent }));
  };

  const activeFile = openedFiles.find(file => file.id === activeFileId);

  return (
    <div className="file-tabs">
      <div className="tabs-header">
        {openedFiles.map(file => (
          <div
            key={file.id}
            className={`tab ${file.id === activeFileId ? 'active' : ''}`}
            onClick={() => setActiveFileId(file.id)}
          >
            {file.name}
            <button onClick={() => handleCloseFile(file.id)}>x</button>
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {activeFile && (
          <MonacoEditor
            file={activeFile}
            onSave={(newContent) => handleSave(activeFile.id, newContent)}
          />
        )}
      </div>
    </div>
  );
};

export default FileTabs;
