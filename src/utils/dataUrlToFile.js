export default  function dataURLtoFile(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], {type:mime});
  return new File([blob], 'defaultAvatar.jpg')
}