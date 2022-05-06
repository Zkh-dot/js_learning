console.log(`You're app is working sir`);
(() => {
  document.addEventListener('DOMContentLoaded', async () => {
    const protocol = 'http';
    const host = 'localhost';
    const port = '5555';
    const net = (path) =>
      fetch(`${protocol}://${host}:${port}${path}`).then((data) => data.json());

    const textElem = document.querySelectorAll('.text')[0];
    const content = await net('/info');
    console.log('textElem is: ', textElem);
    console.log('content is: ', content);
    textElem.innerText = content.data;
  });
})();
