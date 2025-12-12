// mobile nav toggle + smooth scroll
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.hamburger');
  const header = document.querySelector('header');
  const nav = header && header.querySelector('.navbar');
  // create mobile menu container (if not present)
  let mobileMenu = nav && nav.querySelector('.mobile-menu');
  if(!mobileMenu && nav){
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('id','mobile-menu');
    mobileMenu.innerHTML = `
      <a href="#hero">Home</a>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    `;
    nav.appendChild(mobileMenu);
  }

  // Toggle by adding/removing a class so CSS controls display
  if (btn) {
    btn.addEventListener('click', ()=>{
      const isOpen = mobileMenu && mobileMenu.classList.toggle('open');
      btn.classList.toggle('open', !!isOpen);
      btn.setAttribute('aria-expanded', String(!!isOpen));
    });
  }

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ 
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(mobileMenu) {
          mobileMenu.classList.remove('open');
          if(btn) { btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('open'); }
        }
      }
    })
  })

  // Close mobile menu with Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      if(btn) { btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('open'); }
    }
  });

  // Close mobile menu when clicking outside the header/menu
  document.addEventListener('click', function(e){
    if(mobileMenu.classList.contains('open')){
      const target = e.target;
      if(!header.contains(target)){
        mobileMenu.classList.remove('open');
        if(btn) { btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('open'); }
      }
    }
  });

  // Close mobile menu when switching to larger screens
  window.addEventListener('resize', function(){
    if(window.innerWidth > 899 && mobileMenu && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      if(btn) { btn.setAttribute('aria-expanded','false'); btn.classList.remove('open'); }
    }
  });

  // Scroll spy: set active class on nav links when their section is in view
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks).map(a=> document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function updateActiveLink(){
    let index = -1;
    for(let i=0;i<sections.length;i++){
      const rect = sections[i].getBoundingClientRect();
      if(rect.top <= 120 && rect.bottom > 120){ index = i; break; }
    }
    if(index === -1){
      // if no section matched, fall back to top-most visible
      for(let i=sections.length-1;i>=0;i--){ if(sections[i].getBoundingClientRect().top <= 200){ index = i; break; } }
    }
    navLinks.forEach((a,i)=> a.classList.toggle('active', i===index));
  }
  window.addEventListener('scroll', updateActiveLink, {passive:true});
  window.addEventListener('resize', updateActiveLink);
  setTimeout(updateActiveLink, 100);
});
