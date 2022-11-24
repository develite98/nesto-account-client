export interface MixFileList {
  directories: string[];
  files: MixFile[];
}

export interface MixFile {
  folderName: string;
  fileFolder?: string;
  filename?: string;
  extension?: string;
  fullPath?: string;
  webPath?: string;
}
