function getVideoId(url) {
  if (url) {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(url)[3];
  }
  return url;
}

export { getVideoId };
