(function () {
  function init() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    let open = false;

    // Create toggle button
    const btn = document.createElement('button');
    btn.id = 'sidebar-toggle';
    btn.setAttribute('aria-label', 'Toggle Sidebar');
    btn.innerHTML = '☰';
    btn.style.cssText = [
      'position:fixed',
      'top:16px',
      'left:16px',
      'z-index:9999',
      'background:var(--sidebar-bg,#1e1e2e)',
      'border:none',
      'color:var(--sidebar-muted-color,#ccc)',
      'width:36px',
      'height:36px',
      'border-radius:6px',
      'font-size:18px',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center'
    ].join(';');
    document.body.appendChild(btn);

    // Sidebar transition
    sidebar.style.setProperty('transition', 'transform 0.3s ease', 'important');

    function hide() {
      sidebar.style.setProperty('transform', 'translateX(-260px)', 'important');
      btn.innerHTML = '☰';
    }

    function show() {
      sidebar.style.setProperty('transform', 'translateX(0)', 'important');
      btn.innerHTML = '✕';
    }

    // Start hidden
    hide();

    btn.addEventListener('click', function () {
      open = !open;
      open ? show() : hide();
    });

    // Prevent Chirpy from overriding our transform
    let observing = true;
    new MutationObserver(function () {
      if (!observing) return;
      observing = false;
      open ? show() : hide();
      setTimeout(() => { observing = true; }, 50);
    }).observe(sidebar, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
