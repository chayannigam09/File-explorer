export const mockFileSystem = {
    name: "root",
    isFolder: true,
    children: [
      {
        name: "Folder1",
        isFolder: true,
        children: [
          {
            name: "File1.txt",
            isFolder: false,
            content: "This is the content of File1.txt",
          },
        ],
      },
      {
        name: "File2.txt",
        isFolder: false,
        content: "This is the content of File2.txt",
      },
    ],
  };
  