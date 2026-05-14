import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function createStarterZip(templateFiles) {
  const zip = new JSZip();

  Object.entries(templateFiles).forEach(([filePath, content]) => {
    zip.file(filePath, content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `starter-killer-template-${Date.now()}.zip`);
}
