(function(){
  const themeKey='work-links-theme';
  const storedTheme=localStorage.getItem(themeKey);
  const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(storedTheme==='dark'||(!storedTheme&&prefersDark)) document.body.classList.add('dark-theme');

  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.sidebar a').forEach(link=>{
    const href=(link.getAttribute('href')||'').toLowerCase();
    if(href===file){link.classList.add('active');link.setAttribute('aria-current','page');}
  });

  const sidebar=document.querySelector('.sidebar');
  const menuButton=document.querySelector('.menu-toggle');
  const mobileHeader=document.querySelector('.mobile-header');

  function makeThemeButton(className){
    const button=document.createElement('button');
    button.type='button';
    button.className=className;
    button.addEventListener('click',toggleTheme);
    return button;
  }
  const desktopTheme=makeThemeButton('theme-toggle');
  desktopTheme.innerHTML='<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-text"></span>';
  if(sidebar) sidebar.appendChild(desktopTheme);

  const mobileTheme=makeThemeButton('mobile-theme-toggle');
  if(mobileHeader&&menuButton){
    const actions=document.createElement('div'); actions.className='mobile-actions';
    menuButton.parentNode.insertBefore(actions,menuButton); actions.appendChild(mobileTheme); actions.appendChild(menuButton);
  }

  function updateThemeButtons(){
    const dark=document.body.classList.contains('dark-theme');
    const icon=dark?'☀':'☾';
    const label=dark?'Light mode':'Dark mode';
    const iconEl=desktopTheme.querySelector('.theme-toggle-icon');
    const textEl=desktopTheme.querySelector('.theme-toggle-text');
    if(iconEl) iconEl.textContent=icon;
    if(textEl) textEl.textContent=label;
    desktopTheme.setAttribute('aria-label','Switch to '+label.toLowerCase());
    mobileTheme.textContent=icon; mobileTheme.title=label; mobileTheme.setAttribute('aria-label','Switch to '+label.toLowerCase());
  }
  function toggleTheme(){
    document.body.classList.toggle('dark-theme');
    localStorage.setItem(themeKey,document.body.classList.contains('dark-theme')?'dark':'light');
    updateThemeButtons();
  }
  updateThemeButtons();

  if(!menuButton||!sidebar)return;
  const close=()=>{document.body.classList.remove('nav-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');menuButton.textContent='☰';};
  menuButton.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuButton.textContent=open?'×':'☰';});
  sidebar.addEventListener('click',e=>{if(e.target.closest('a')&&innerWidth<=820)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();
