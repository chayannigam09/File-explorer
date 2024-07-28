import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import { updateFileContent } from '../redux/fileSystemSlice';

const MonacoEditor = ({ file, onSave }) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();
  const dispatch = useDispatch();

  useEffect(() => {
    if (monaco && editorRef.current) {
      const model = monaco.editor.createModel(
        file.content,
        'javascript' // You can change this to match the file type, e.g., 'html', 'css', 'json'
      );
      editorRef.current.setModel(model);
      window.addEventListener('resize', () => {
        editorRef.current.layout(); // Force layout adjustment on resize
      });
      editorRef.current.onDidChangeModelContent(() => {
        const newContent = editorRef.current.getValue();
        onSave(newContent);
      });
      const disposable = editorRef.current.onDidChangeModelContent(() => {
        const newContent = editorRef.current.getValue();
        dispatch(updateFileContent({ node: file, newContent })); // Dispatch update action
      });
      return () => {
        disposable.dispose(); // Clean up event listener
      };
    }
  }, [monaco, file, dispatch]);

  return (
    <div>
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={file.content}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default MonacoEditor;
