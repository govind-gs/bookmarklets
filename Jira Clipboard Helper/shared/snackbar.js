function showSnackbar(message, isError) {
  var existing = document.getElementById('_bm_snackbar');
  if (existing) existing.remove();

  var icon = isError ? '\u274C' : '\u2705';

  var el = document.createElement('div');
  el.id = '_bm_snackbar';
  el.textContent = icon + '  ' + message;
  el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);'
    + 'padding:14px 28px;border-radius:8px;z-index:2147483647;font-size:15px;'
    + 'font-family:-apple-system,sans-serif;color:#fff;opacity:0;transition:opacity 0.3s;'
    + 'pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,0.3);'
    + 'background:#2e2e2e;border:2px solid ' + (isError ? '#d32f2f' : '#4caf50') + ';';
  document.body.appendChild(el);
  setTimeout(function() { el.style.opacity = '1'; }, 10);
  setTimeout(function() {
    el.style.opacity = '0';
    setTimeout(function() { el.remove(); }, 300);
  }, 5000);
}
