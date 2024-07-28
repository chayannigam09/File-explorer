import { createSlice } from '@reduxjs/toolkit';
import { mockFileSystem } from '../mockData';

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState: mockFileSystem,
  reducers: {
    renameNode: (state, action) => {
      const { node, newName } = action.payload;
      const rename = (currentNode) => {
        if (currentNode === node) {
          currentNode.name = newName;
        } else if (currentNode.children) {
          currentNode.children.forEach(rename);
        }
      };
      rename(state);
    },
    deleteNode: (state, action) => {
      const node = action.payload;
      const deleteNode = (currentNode) => {
        if (currentNode.children) {
          currentNode.children = currentNode.children.filter(
            (child) => child !== node
          );
          currentNode.children.forEach(deleteNode);
        }
      };
      deleteNode(state);
    },
    addNode: (state, action) => {
      const { parentNode, newNode } = action.payload;
      const addNode = (currentNode) => {
        if (currentNode === parentNode) {
          currentNode.children.push(newNode);
        } else if (currentNode.children) {
          currentNode.children.forEach(addNode);
        }
      };
      addNode(state);
    },
    updateFileContent: (state, action) => {
      const { node, newContent } = action.payload;
      const updateContent = (currentNode) => {
        if (currentNode === node) {
          currentNode.content = newContent;
        } else if (currentNode.children) {
          currentNode.children.forEach(updateContent);
        }
      };
      updateContent(state);
    },
  },
});

export const { renameNode, deleteNode, addNode, updateFileContent } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
