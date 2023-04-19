const handleDownload = (downloadPen) => {
  const element = document.createElement('a');
  const file = new Blob([downloadPen], { type: 'text/html' });
  element.href = URL.createObjectURL(file);
  element.download = 'index.html';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default handleDownload;
