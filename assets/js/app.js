/* AKHILESH — THE SERIES | Independent portfolio experience */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const stages = {
    intro: $('#introScreen'),
    profiles: $('#profilesScreen'),
    site: $('#siteShell')
  };
  let activeProfile = 'main';
  const profileNames = {main:'AKHILESH',recruiter:'RECRUITER',analyst:'DATA ANALYST',explorer:'AI EXPLORER'};
  const profileDestinations = {main:'home',recruiter:'resume',analyst:'originals',explorer:'journey'};
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = prefersReducedMotion ? 'auto' : 'smooth';
  let openModalName = null, trailerTimers = [];

  function stageTo(next) {
    Object.entries(stages).forEach(([key,element]) => {
      element.hidden = key !== next;
      element.classList.toggle('is-active',key === next);
    });
    document.body.classList.toggle('is-landing',next !== 'site');
    window.scrollTo({top:0,behavior:'instant'});
    if(next === 'site') { $('#viewerLabel').textContent = profileNames[activeProfile]; requestAnimationFrame(() => updateActiveLink()); }
  }
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if(target) target.scrollIntoView({behavior: motion,block:'start'});
  }
  function closeMenu() { $('#mainNav').classList.remove('menu-open'); $('#menuToggle').setAttribute('aria-expanded','false'); }

  $('#enterExperience').addEventListener('click',()=>stageTo('profiles'));
  $('#backToIntro').addEventListener('click',()=>stageTo('intro'));
  $('#switchProfile').addEventListener('click',()=>{closeMenu();stageTo('profiles');});
  $$('.profile-card').forEach(button=>button.addEventListener('click',()=>{
    activeProfile=button.dataset.profile;
    stageTo('site');
    const id=profileDestinations[activeProfile];
    if(id !== 'home') setTimeout(()=>scrollToSection(id),140);
  }));
  $('#menuToggle').addEventListener('click',()=>{
    const isOpen=$('#mainNav').classList.toggle('menu-open');
    $('#menuToggle').setAttribute('aria-expanded',String(isOpen));
  });
  $$('.nav-item').forEach(a=>a.addEventListener('click',closeMenu));
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{
    const href=a.getAttribute('href'),target=href && document.querySelector(href);
    if(!target) return;
    ev.preventDefault();
    window.history.replaceState(null,'',href);
    scrollToSection(href.slice(1));
  }));
  function updateActiveLink(){
    if(stages.site.hidden) return;
    $('#topbar').classList.toggle('scrolled',window.scrollY>25);
    const sections=['home','resume','moments','skills','originals','about','journey','top-picks'];
    const cutoff=window.scrollY+window.innerHeight*.35;
    let active='home';
    for(const id of sections){const e=document.getElementById(id);if(e && e.offsetTop <= cutoff) active=id;}
    $$('.nav-item').forEach(a=>a.classList.toggle('active',a.hash === '#'+active));
  }
  window.addEventListener('scroll',updateActiveLink,{passive:true});
  window.addEventListener('resize',closeMenu);
  $$('[data-slide]').forEach(button=>button.addEventListener('click',()=>{
    const track=document.getElementById(button.dataset.target);
    if(track) track.scrollBy({left:(button.dataset.slide==='next'?1:-1)*Math.min(650,track.clientWidth*.8),behavior:motion});
  }));

  const skills = [
    {key:'analytics',name:'Data Analytics',symbol:'▥',items:[['Advanced Excel','X','#55ac72'],['Power BI','BI','#e8c549'],['SQL','SQL','#b9a8ed'],['Tableau','T','#6bb8e8'],['Power Query','PQ','#e0b36a'],['DAX','DAX','#e8c549'],['Pivot Tables','P','#6ac19b'],['Data Cleaning','✓','#a9a4e5']]},
    {key:'datascience',name:'Data Science',symbol:'◉',items:[['Python','Py','#83b5ef'],['Pandas','pd','#b39bfa'],['NumPy','N','#6daff3'],['Matplotlib','M','#d89c8b'],['Seaborn','S','#83cbd9'],['Statistics','σ','#dbc081'],['Data Wrangling','{ }','#9ad2b7'],['EDA','EDA','#e6a0b0']]},
    {key:'ai',name:'Machine Learning & AI',symbol:'✳',items:[['Scikit-learn','SK','#e8aa5b'],['Machine Learning','ML','#d79aee'],['Generative AI','AI','#81cbbd'],['Prompt Engineering','<>','#e6a0c2'],['TensorFlow','TF','#eab45b'],['Agentic AI','A+','#b2adee']]},
    {key:'development',name:'Development',symbol:'⌘',items:[['HTML','</>','#e9a477'],['CSS','CSS','#76afea'],['JavaScript','JS','#e7d470'],['Node.js','N','#8dc58f'],['REST APIs','API','#d3a7e6'],['Git','G','#de9576']]},
    {key:'databases',name:'Databases',symbol:'▤',items:[['MySQL','SQL','#6aaad5'],['MongoDB','M','#7cbc89'],['PostgreSQL','PG','#91b3e6'],['Relational Modeling','ER','#d6a9b5']]},
    {key:'tools',name:'Tools & Platforms',symbol:'✦',items:[['GitHub','GH','#dfdae5'],['VS Code','<>','#6bb4f0'],['Jupyter','J','#f2a66f'],['Google Colab','Co','#e2b970'],['MS Office','MS','#cbaade'],['Data Visualization','DV','#87cbbb']]}
  ];
  let selectedSkill='analytics';
  function renderSkills(){
    $('#skillsTabs').innerHTML=skills.map(s=>`<button type="button" class="skill-tab ${selectedSkill===s.key?'active':''}" role="tab" aria-selected="${selectedSkill===s.key}" data-skill="${s.key}"><span><span>${s.symbol}</span>${s.name}</span><em>›</em></button>`).join('');
    const selected=skills.find(s=>s.key===selectedSkill);
    $('#skillsCategoryTitle').textContent=selected.name.toUpperCase();
    $('#skillsCount').textContent=`${String(selected.items.length).padStart(2,'0')} TECHNOLOGIES`;
    $('#skillsGrid').innerHTML=selected.items.map(([name,symbol,color])=>`<div class="skill-tile"><span class="skill-logo" style="color:${color}">${symbol}</span><strong>${name}</strong></div>`).join('');
    $$('[data-skill]').forEach(b=>b.addEventListener('click',()=>{selectedSkill=b.dataset.skill;renderSkills();}));
  }
  renderSkills();

  const projects = [
    {id:'bmw',name:'BMW SHOWROOM',category:'BUSINESS INTELLIGENCE',eyebrow:'A DATA ANALYTICS ORIGINAL',art:'BMW',a:'#73202d',b:'#16101d',summary:'A multi-table BMW showroom analytics project built around Power BI and Power Query transformations.',details:'Prepared and cleaned a multi-table BMW showroom dataset using Power Query. Focused on data types, structured preparation, transformations, and readiness for sales and operations analysis. Earlier resume materials describe 25 tables and approximately 9,134 records.',tags:['POWER BI','POWER QUERY','EXCEL','DATA CLEANING'],url:'https://github.com/codewithakhilesh/BMW_Showroom_Analysis_PB',urlLabel:'GITHUB REPOSITORY'},
    {id:'airlines',name:'AIRLINE SYSTEM',category:'RELATIONAL DATABASE',eyebrow:'A SQL ORIGINAL',art:'✈',a:'#153e68',b:'#101426',summary:'A relational airline operations database covering bookings, flights, passengers and payments.',details:'Designed and queried a MySQL relational database for passengers, flights, bookings, tickets, airports, payments, and baggage. Resume records describe 10 interconnected tables and approximately 1,000 records.',tags:['MYSQL','SQL JOINS','GROUP BY','DATABASE DESIGN'],url:'https://github.com/codewithakhilesh/Airline_management_systemSQL',urlLabel:'VIEW SQL FILES'},
    {id:'shell',name:'SHELL PUMP',category:'EXCEL ANALYTICS',eyebrow:'AN OPERATIONS ORIGINAL',art:'10K',a:'#7b5119',b:'#24171a',summary:'Fuel station sales and operations reporting across shifts, months, and payment methods.',details:'Analyzed approximately 10,000 fuel-station transactions in Advanced Excel. Used filtering, lookup formulas, pivot tables, and worksheets to explore monthly, shift-wise, and payment-method performance.',tags:['ADVANCED EXCEL','PIVOT TABLES','REPORTING','DATA CLEANING'],url:null,urlLabel:null},
    {id:'goyatra',name:'GOYATRA',category:'TRAVEL PLANNER',eyebrow:'A WEB APP ORIGINAL',art:'✧',a:'#1b645d',b:'#102023',summary:'A trip-planning web application with itineraries, budget breakdowns and saved trip records.',details:'The repository documents a JavaScript frontend and Node.js/Express backend with MongoDB, trip APIs, destination planning, budget breakdown logic, itinerary generation, and PDF export. The README describes the implementation and testing steps.',tags:['JAVASCRIPT','NODE.JS','EXPRESS','MONGODB'],url:'https://github.com/codewithakhilesh/GenAI-Travel-Planner',urlLabel:'GITHUB REPOSITORY'},
    {id:'medibill',name:'MEDIBILL PRO',category:'MEDICAL SOFTWARE',eyebrow:'A SOFTWARE ORIGINAL',art:'+',a:'#5b224e',b:'#141322',summary:'A pharmacy billing and stock management application with role-based workflows.',details:'A locally developed medical store application covering billing, medicine stock, prescriptions, reports and MySQL data management. Developed and refined in multiple iterations with separate administrative and clinical workflows.',tags:['PYTHON','MYSQL','BILLING','INVENTORY'],url:null,urlLabel:null},
    {id:'showroom',name:'SHOWROOM DATA',category:'EXCEL DATA PROJECT',eyebrow:'A DATASET ORIGINAL',art:'XL',a:'#7e3c28',b:'#19101b',summary:'A premium automobile showroom dataset created for cleaning and analytical practice.',details:'A 10,000-row premium automobile sales dataset available in the Showroom Dashboard Excel project repository for data preparation and reporting work.',tags:['EXCEL','DATA ANALYSIS','AUTOMOTIVE'],url:'https://github.com/codewithakhilesh/Showroom_Dashboard_ex',urlLabel:'GITHUB REPOSITORY'}
  ];
  const projectArt = {bmw:'visual-bmw', airlines:'visual-airline', shell:'visual-shell', goyatra:'visual-goyatra', medibill:'visual-medibill', showroom:'visual-bmw'};
  const asset = (name) => 'assets/images/'+name+'.webp';
  function posterImage(p){ return asset(projectArt[p.id] || p.image || 'visual-data'); }
  function projectPoster(p){return `<div class="project-poster visual-poster" style="--posterA:${p.a};--posterB:${p.b};--visual-url:url('${posterImage(p)}')"><span class="poster-corner">A SERIES ORIGINAL</span><div class="poster-heading"><span>${p.eyebrow}</span><h3>${p.name}</h3></div></div>`;}
  $('#projectsGrid').innerHTML=projects.map(p=>`<article class="original-card">${projectPoster(p)}<div class="original-content"><div class="original-tags">${p.tags.slice(0,3).map(t=>`<span>${t}</span>`).join('')}</div><p>${p.summary}</p><div class="original-actions"><button type="button" data-project="${p.id}">▶ VIEW PROJECT</button>${p.url?`<a href="${p.url}" target="_blank" rel="noopener">GITHUB ↗</a>`:'<span class="original-tags"><span>LOCAL / PORTFOLIO PROJECT</span></span>'}</div></div></article>`).join('');
  $('#picksTrack').innerHTML=projects.slice(0,5).map((p,i)=>`<button type="button" class="pick-card" data-project="${p.id}" aria-label="View ${p.name} details" style="background:transparent;border:0;padding-top:0;padding-bottom:0;color:inherit;text-align:left"><span class="pick-number">${i+1}</span><span class="pick-image visual-pick" style="--posterA:${p.a};--posterB:${p.b};--visual-url:url('${posterImage(p)}')"><span class="pick-label">TOP PICK 0${i+1}</span><h3>${p.name}</h3></span></button>`).join('');

  // ROUND 1 — modular project catalog. Add future projects here without editing the layout.
  const moduleProjects = {
    sql: [
      {id:'airlines',name:'Airlines Management System',label:'AVIATION / MYSQL',image:'visual-airline',note:'Relational airline database and SQL reporting.',url:'https://github.com/codewithakhilesh/Airline_management_systemSQL'},
      {id:'banking-sql',name:'Banking Management System',label:'BANKING / SQL',image:'visual-data',note:'SQL management system listed in the local project folders.'},
      {id:'airforce-sql',name:'Indian Air Force Management System',label:'DEFENCE / SQL',image:'visual-ai',note:'SQL management system listed in the local project folders.'},
      {id:'rides-sql',name:'Ola & Uber Management System',label:'TRANSPORT / SQL',image:'visual-career',note:'SQL management system listed in the local project folders.'},
      {id:'railway-sql',name:'Railway Management System',label:'RAILWAYS / SQL',image:'railway-graphic',note:'SQL management system listed in the local project folders.'}
    ],
    excel: [
      {id:'coffee-excel',name:'Coffee Shop Sales',label:'SALES / ADVANCED EXCEL',image:'coffee-graphic',note:'Coffee shop sales workbook in the Excel project collection.'},
      {id:'showroom-excel',name:'Premium Automobile Sales',label:'AUTO / ADVANCED EXCEL',image:'visual-bmw',note:'Automobile sales dataset and reporting work.',url:'https://github.com/codewithakhilesh/Showroom_Dashboard_ex'},
      {id:'shell',name:'Shell Pump Sales Analysis',label:'FUEL STATION / ADVANCED EXCEL',image:'visual-shell',note:'Operational and sales analysis using a 10,000-record dataset.'}
    ],
    powerbi: [
      {id:'bmw',name:'BMW Management',label:'AUTO / POWER BI',image:'visual-bmw',note:'BMW showroom data analysis and Power Query preparation.',url:'https://github.com/codewithakhilesh/BMW_Showroom_Analysis_PB'},
      {id:'food-bi',name:'Food Delivery Analytics',label:'DELIVERY / POWER BI',image:'visual-data',note:'Food delivery analytics project folder in the Power BI collection.'},
      {id:'hospital-bi',name:'Hospital Management',label:'HEALTHCARE / POWER BI',image:'hospital-graphic',note:'Hospital management project folder in the Power BI collection.'}
    ]
  };
  const moduleCategory = {sql:'SQL ORIGINALS',excel:'EXCEL ANALYTICS',powerbi:'POWER BI DASHBOARDS'};
  const supplementalProjects=[];
  Object.entries(moduleProjects).forEach(([key,items])=>{
    const target=$('#'+(key==='powerbi'?'powerbi':' '+key).trim()+'ProjectCards');
    target.innerHTML=items.map((p,i)=>`<article class="module-card"><button type="button" data-module-project="${p.id}" aria-label="View ${p.name} details" class="module-poster" style="--module-art:url('${asset(p.image)}')"><span class="module-item-kicker">${moduleCategory[key]} / ${String(i+1).padStart(2,'0')}</span><strong>${p.name}</strong><span class="module-open-symbol" aria-hidden="true">↗</span></button><div class="module-info"><span>${p.label}</span><p>${p.note}</p><button type="button" data-module-project="${p.id}">VIEW PROJECT <b>↗</b></button></div></article>`).join('');
    for(const p of items){
      if(projects.find(existing=>existing.id===p.id))continue;
      supplementalProjects.push({id:p.id,name:p.name.toUpperCase(),category:moduleCategory[key],eyebrow:p.label,art:'',a:'#192f4a',b:'#171323',summary:p.note,details:p.note+' Detailed implementation information and project files can be linked as the archive grows.',tags:[key==='powerbi'?'POWER BI':key.toUpperCase(),'PROJECT ARCHIVE'],url:p.url||null,urlLabel:'GITHUB REPOSITORY',image:p.image});
    }
  });
  $$('[data-module-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.moduleProject)));
  function openProject(id){
    const p=[...projects,...supplementalProjects].find(x=>x.id===id);if(!p)return;
    const poster=$('#dialogPoster');poster.style.background=`linear-gradient(0deg,${p.b}bb,#0002),url('${posterImage(p)}') center/cover`;poster.innerHTML='';
    $('#projectModalCategory').textContent=p.eyebrow;
    $('#projectModalTitle').textContent=p.name;
    $('#projectModalDescription').textContent=p.details;
    $('#projectModalTags').innerHTML=p.tags.map(tag=>`<span>${tag}</span>`).join('');
    $('#projectModalActions').innerHTML=(p.url?`<a href="${p.url}" target="_blank" rel="noopener" class="button button-light">${p.urlLabel} ↗</a>`:'') + '<button type="button" class="button button-outline" data-dismiss-project>CLOSE</button>';
    $('#projectModal').hidden=false;openModalName='project';document.body.classList.add('has-modal');
    $('[data-dismiss-project]',$('#projectModalActions'))?.addEventListener('click',closeProject);
    $('.modal-close',$('#projectModal')).focus();
  }
  function closeProject(){ $('#projectModal').hidden=true;openModalName=null;document.body.classList.remove('has-modal'); }
  $$('[data-project]').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));
  $$('[data-dismiss-project]').forEach(e=>e.addEventListener('click',closeProject));

  const seasons=[
    {tag:'SEASON 01',label:'THE BEGINNING',heading:'THE FOUNDATION',years:'2022 — 2026',desc:'Studying Computer Science at Sant Gadge Baba Amravati University. Building a foundation in programming, problem-solving, data and systems thinking.',episodes:[['EPISODE 01 · 2022','A NEW CHAPTER','Starting engineering'],['EPISODE 02','COMPUTER SCIENCE','Discovering logic and code'],['EPISODE 03 · 2026','THE DEGREE','BE Computer Science']],colors:[['#5d1d3d','#1b1324'],['#40406d','#111527'],['#7c502b','#221821']]},
    {tag:'SEASON 02',label:'LEARNING DATA',heading:'A CURIOSITY FOR DATA',years:'2025',desc:'Moving from programming to understanding real datasets, analytical methods, and practical tools for data transformation.',episodes:[['EPISODE 01','EXCEL INSIGHTS','Pivot tables and reports'],['EPISODE 02','SQL FOUNDATIONS','Joins and relational tables'],['EPISODE 03','POWER BI','Transform and visualize']],colors:[['#526132','#141d18'],['#174d73','#141627'],['#6c5720','#211c15']]},
    {tag:'SEASON 03',label:'THE INTERNSHIP',heading:'LEARNING BY DOING',years:'2025 — 2026',desc:'Data Science internship experience at Labmentix with practical work involving data collection, cleaning, EDA and predictive-model techniques.',episodes:[['EPISODE 01','THE RAW DATA','Collect and clean'],['EPISODE 02','FIND THE PATTERN','Explore and interpret'],['EPISODE 03','THE MODEL','Feature engineering and ML']],colors:[['#62262d','#1b151f'],['#254e75','#121728'],['#284e3f','#131e1b']]},
    {tag:'SEASON 04',label:'REAL PROJECTS',heading:'BUILDING REAL PROJECTS',years:'2026',desc:'Turning learning into tangible analytics work: relational airline data, Excel reporting, BMW showroom preparation, and product workflows.',episodes:[['EPISODE 01','THE ANALYST','BMW and Shell datasets'],['EPISODE 02','THE ARCHITECT','Airline SQL system'],['EPISODE 03','THE BUILDER','Software and web projects']],colors:[['#71283b','#18111d'],['#8a541e','#251718'],['#244974','#151525']]},
    {tag:'SEASON 05',label:'WHAT’S NEXT',heading:'THE FUTURE IS DATA',years:'2026 — BEYOND',desc:'Growing through Data Analytics, Data Science and practical AI, with an interest in building systems that make information more useful.',episodes:[['EPISODE 01','DEEPER INSIGHTS','Advanced analytics'],['EPISODE 02','AI EXPLORATION','Learning and experiments'],['EPISODE 03','THE NEXT ROLE','Opportunity to contribute']],colors:[['#275c69','#161b26'],['#5c3275','#1a142b'],['#8b3942','#25171d']]}
  ];
  let activeSeason=3;
  function renderJourney(){
    $('#journeyTabs').innerHTML=seasons.map((s,i)=>`<button type="button" role="tab" data-season="${i}" aria-selected="${i===activeSeason}" class="journey-tab ${i===activeSeason?'active':''}"><small>${s.tag}</small><strong>${s.label}</strong></button>`).join('');
    const s=seasons[activeSeason];
    const seasonArt=['episode-story','visual-data','episode-skills','episode-projects','visual-career'];
    const futureArt=['visual-data','visual-ai','visual-career'];
    $('#journeyFeature').innerHTML=`<div class="journey-feature-head"><span>${s.tag} · NOW PLAYING</span><small>${s.years}</small></div><h3 class="display">${s.heading}</h3><p>${s.desc}</p><div class="journey-episodes">${s.episodes.map((e,i)=>`<div class="journey-episode" style="--eA:${s.colors[i][0]};--eB:${s.colors[i][1]};--episode-image:url('${asset(activeSeason===4?futureArt[i]:seasonArt[(activeSeason+i)%seasonArt.length])}')"><span>${e[0]}</span><div><strong>${e[1]}</strong><p>${e[2]}</p></div></div>`).join('')}</div>`;
    $$('[data-season]').forEach(button=>button.addEventListener('click',()=>{activeSeason=Number(button.dataset.season);renderJourney();}));
  }
  renderJourney();

  const trailerScenes=[
    ['A SERIES ORIGINAL','EVERY STORY<br>STARTS WITH<br><span>A QUESTION.</span>','Mine started with a curiosity for data.'],
    ['EPISODE ONE: THE DATA','RAW DATA.<br>REAL <span>INSIGHTS.</span>','Excel. SQL. Power BI. Python.'],
    ['THE STORY CONTINUES','TURNING IDEAS<br>INTO <span>IMPACT.</span>','Welcome to Akhilesh — The Series.']
  ];
  function clearTrailerTimers(){trailerTimers.forEach(clearTimeout);trailerTimers=[];}
  function setTrailerScene(index){const [kicker,title,description]=trailerScenes[index];$('#trailerKicker').textContent=kicker;$('#modalTitle').innerHTML=title;$('#trailerCaption').textContent=description;}
  function openTrailer(){
    $('#introModal').hidden=false;openModalName='intro';document.body.classList.add('has-modal');
    clearTrailerTimers();setTrailerScene(0);
    const bar=$('.trailer-progress span');bar.style.transition='none';bar.style.width='0';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{bar.style.transition='width 11s linear';bar.style.width='100%';}));
    if(!prefersReducedMotion){trailerTimers.push(setTimeout(()=>setTrailerScene(1),3500));trailerTimers.push(setTimeout(()=>setTrailerScene(2),7000));}
    trailerTimers.push(setTimeout(closeTrailer,11000));
    $('.modal-close',$('#introModal')).focus();
  }
  function closeTrailer(){clearTrailerTimers();$('#introModal').hidden=true;document.body.classList.remove('has-modal');openModalName=null;}
  $('#playIntroFromSite').addEventListener('click',openTrailer);
  $('#skipTrailer').addEventListener('click',closeTrailer);
  $$('[data-dismiss-modal]').forEach(el=>el.addEventListener('click',closeTrailer));
  $('#watchAgain').addEventListener('click',()=>scrollToSection('home'));
  $('#replayOpening').addEventListener('click',()=>stageTo('intro'));
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){if(openModalName==='intro')closeTrailer();else if(openModalName==='project')closeProject();else closeMenu();}});

  // ROUND 1 — actual in-page PDF and certificate viewer.
  const pdfPath='assets/docs/Akhilesh_Bhagat_Resume.pdf';
  const certificates=$$('.certificate-card').map((el,i)=>({title:el.querySelector('strong').textContent,url:el.dataset.certUrl,element:el,index:i}));
  let mediaMode='resume', certificateIndex=-1, zoomLevel=1, previousFocused=null;
  const media=$('#mediaModal'), frame=$('#mediaPdf'), photo=$('#mediaImg');
  function setZoom(level){
    zoomLevel=Math.max(.5,Math.min(2.5,Math.round(level*10)/10));
    $('#mediaZoom').textContent=Math.round(zoomLevel*100)+'%';
    const body=$('#mediaZoomWrap');
    body.style.transform=`scale(${zoomLevel})`;
    body.style.width=(100/zoomLevel)+'%';
    body.style.height=(100/zoomLevel)+'%';
  }
  function showMedia(){
    previousFocused=document.activeElement;
    media.hidden=false;
    mediaMode=certificateIndex===-1?'resume':'certificate';
    document.body.classList.add('has-modal');
    setZoom(1);
    $('#mediaStage').scrollTo(0,0);
    frame.hidden=true;photo.hidden=true;
    $('#mediaError').hidden=true;
    const isCert=mediaMode==='certificate';
    $('#mediaPrev').hidden=!isCert;$('#mediaNext').hidden=!isCert;$('#mediaCounter').hidden=!isCert;
    $('#mediaEyebrow').textContent=isCert?'CREDENTIALS / ARCHIVE':'DOCUMENT / RESUME';
    if(isCert){
      const entry=certificates[certificateIndex];
      $('#mediaTitle').textContent=entry.title;
      $('#mediaCounter').textContent=`${certificateIndex+1} / ${certificates.length}`;
      $('#mediaDownload').href=entry.url;
      // Cross-origin images may open instead of download. Original asset remains accessible.
      $('#mediaDownload').removeAttribute('download');
      $('#mediaDownload').textContent='↗ ORIGINAL FILE';
      $('#mediaFallback').href=entry.url;
      photo.alt=entry.title+' certificate archive image';
      photo.hidden=false;
      photo.src=entry.url;
    }else{
      $('#mediaTitle').textContent='AKHILESH — RESUME';
      $('#mediaDownload').href=pdfPath;
      $('#mediaDownload').setAttribute('download','Akhilesh_Bhagat_Resume.pdf');
      $('#mediaDownload').textContent='⇩ DOWNLOAD PDF';
      frame.hidden=false;
      frame.src=pdfPath+'#toolbar=0&navpanes=0&view=FitH';
    }
    $('.media-close').focus();
  }
  function openMedia(index=-1){
    certificateIndex=index;
    if(openModalName==='project')closeProject();
    if(openModalName==='intro')closeTrailer();
    showMedia();openModalName='media';
  }
  function closeMedia(){
    if(media.hidden)return;
    media.hidden=true;
    photo.removeAttribute('src');frame.removeAttribute('src');
    document.body.classList.remove('has-modal');
    openModalName=null;
    previousFocused?.focus();
  }
  $$('[data-open-resume]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();openMedia(-1);}));
  certificates.forEach(c=>c.element.addEventListener('click',()=>openMedia(c.index)));
  $$('[data-close-media]').forEach(el=>el.addEventListener('click',closeMedia));
  $('#mediaPrev').addEventListener('click',()=>{if(certificateIndex>=0)openMedia((certificateIndex+certificates.length-1)%certificates.length);});
  $('#mediaNext').addEventListener('click',()=>{if(certificateIndex>=0)openMedia((certificateIndex+1)%certificates.length);});
  $('#zoomIn').addEventListener('click',()=>setZoom(zoomLevel+.2));
  $('#zoomOut').addEventListener('click',()=>setZoom(zoomLevel-.2));
  $('#zoomReset').addEventListener('click',()=>setZoom(1));
  photo.addEventListener('error',()=>{if(!media.hidden&&mediaMode==='certificate')$('#mediaError').hidden=false;});
  photo.addEventListener('load',()=>{$('#mediaError').hidden=true;});
  document.addEventListener('keydown',ev=>{
    if(openModalName!=='media')return;
    if(ev.key==='Escape')closeMedia();
    if(mediaMode==='certificate'&&ev.key==='ArrowRight')$('#mediaNext').click();
    if(mediaMode==='certificate'&&ev.key==='ArrowLeft')$('#mediaPrev').click();
  });
  media.addEventListener('keydown',ev=>{if(ev.key!=='Tab')return;const focusable=$$('button,a',media).filter(e=>!e.hidden&&e.offsetParent!==null);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}});

  stageTo('intro');
})();
