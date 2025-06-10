function generateQRCode(text) {
  return (
    "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" +
    encodeURIComponent(text)
  );
}
