const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('browser anda mendukung service worker');
    return;
  }

  try {
    await navigator.serviceWorker.register('./sw.bundle.js');
    console.log('resgistrasi service worker');
  } catch (error) {
    console.log('gagal untuk resgitrasi service worker', error);
  }
};

export default swRegister;
