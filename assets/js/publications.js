async function fetchPublications(){
  const container = document.getElementById('publications-list');
  if(!container) return;
  const highlight = (s) => typeof s === 'string'
    ? s.replace(/Baihui\s+Chen/gi, (m) => `<strong class="me">${m}</strong>`) : s;
  try{
    const res = await fetch('data/publications.json');
    const items = await res.json();
    // Group by year desc
    const byYear = items.reduce((acc, item) => {
      acc[item.year] = acc[item.year] || [];
      acc[item.year].push(item);
      return acc;
    }, {});
    const years = Object.keys(byYear).map(Number).sort((a,b)=>b-a);
    container.innerHTML = '';
    for(const year of years){
      const y = document.createElement('h2');
      y.className = 'pub-year';
      y.textContent = `[ ${year} ]`;
      container.appendChild(y);
      for(const p of byYear[year]){
        const div = document.createElement('div');
        div.className = 'pub-item';
        const title = highlight(p.title);
        const authors = highlight(p.authors);
        const venue = highlight(p.venue || '');
        div.innerHTML = `
          <div class="pub-title">${title}</div>
          <div class="pub-meta">${authors}</div>
          <div class="pub-meta">${venue}</div>
        `;
        if(Array.isArray(p.links) && p.links.length){
          const links = document.createElement('div');
          links.className = 'pub-links';
          p.links.forEach(l => {
            const a = document.createElement('a');
            a.className = 'link';
            a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
            a.textContent = l.name;
            links.appendChild(a);
          });
          div.appendChild(links);
        }
        container.appendChild(div);
      }
    }
  }catch(err){
    container.textContent = 'Failed to load publications.';
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
fetchPublications();
