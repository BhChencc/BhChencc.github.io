const illustrationSeeds = ['illus1','illus2','illus3','illus4','illus5','illus6'];
function placeholderIllustration(index){
  const seed = illustrationSeeds[index % illustrationSeeds.length];
  // Lightweight SVG illustrations with background matching the page color
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
    <rect width='200' height='200' fill='#f5f7fa'/>
    <g stroke='#c1c9d6' stroke-width='2' fill='none'>
      <circle cx='60' cy='60' r='24'/>
      <rect x='110' y='40' width='60' height='30' rx='6'/>
      <path d='M20 160h160M40 140l24-24 20 20 36-36 40 40' stroke='#8ab4ff'/>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderProjects(projects){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach((p, idx) => {
    const card = document.createElement('a');
    let cardClass = 'card card-image-only';
    
    // Add special class for ZOMA project
    if (p.title && p.title.includes('ZOMA')) {
      cardClass += ' zoma-project';
    }
    
    card.className = cardClass;
    card.href = p.url || '#';
    // card.target = p.url ? '_blank' : '';
    // card.rel = p.url ? 'noopener' : '';
    card.setAttribute('aria-label', p.title || 'project');

    const base = (p.image && p.image.trim() ? p.image : placeholderIllustration(idx));
    const src = base.startsWith('data:') ? base : `${base}?v=12`;
    const rawTitle = p.title || '';
    // Prefer line break after a year token like 2024/2025; otherwise break before "From"
    let prettyTitle = rawTitle.replace(/(20\d{2})\s+/, '$1<br/>');
    if(!prettyTitle.includes('<br/>')){
      prettyTitle = prettyTitle.replace(/\s+(from)\s+/i, '<br/>$1 ');
    }

    card.innerHTML = `
      <img src="${src}" alt="${p.title || ''}">
      <div class="card-overlay">
        <div class="overlay-title">${prettyTitle}</div>
      </div>
    `;
    const imgEl = card.querySelector('img');
    if(imgEl){
      imgEl.addEventListener('error', () => {
        const fallback = placeholderIllustration(idx);
        imgEl.src = fallback;
      }, { once: true });
    }
    grid.appendChild(card);
  });
}

let allProjects = [];

async function fetchProjects(){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  try{
    const res = await fetch('projects.json?v=14');
    const items = await res.json();
    allProjects = Array.isArray(items) ? items : items.projects;
    renderProjects(allProjects);
  }catch(err){
    grid.textContent = 'Failed to load projects.';
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

fetchProjects();
