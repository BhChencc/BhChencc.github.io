async function fetchPublications(){
  const papersContainer = document.getElementById('publications-list');
  const patentsContainer = document.getElementById('patents-list');
  const navContainer = document.getElementById('pub-nav');
  if(!papersContainer || !patentsContainer || !navContainer) return;

  const highlight = (s) => typeof s === 'string'
    ? s.replace(/Baihui\s+Chen/gi, (m) => `<strong class="me">${m}</strong>`) : s;

  const renderItems = (container, items) => {
    const byYear = items.reduce((acc, item) => {
      acc[item.year] = acc[item.year] || [];
      acc[item.year].push(item);
      return acc;
    }, {});
    const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
    container.innerHTML = '';

    years.forEach((year, idx) => {
      const y = document.createElement('h3');
      y.className = 'pub-year' + (idx > 0 ? ' pub-year-sep' : '');
      y.id = `year-${year}`;
      y.textContent = `[ ${year} ]`;
      container.appendChild(y);

      for(const p of byYear[year]){
        const div = document.createElement('div');
        div.className = 'pub-item';
        const title = highlight(p.title);
        const authors = highlight(p.authors || p.inventors || '');
        const venue = highlight(p.venue || p.number || p.type || '');
        div.innerHTML = `
          <div class="pub-title">${title}</div>
          ${authors ? `<div class="pub-meta">${authors}</div>` : ''}
          ${venue ? `<div class="pub-meta">${venue}</div>` : ''}
        `;
        if(Array.isArray(p.links) && p.links.length){
          const links = document.createElement('div');
          links.className = 'pub-links';
          p.links.forEach((l) => {
            const a = document.createElement('a');
            a.className = 'link';
            a.href = l.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = l.name;
            links.appendChild(a);
          });
          div.appendChild(links);
        }
        container.appendChild(div);
      }
    });
    return years;
  };

  const buildSidebar = () => {
    navContainer.innerHTML = `
      <a class="pub-nav-section" href="#papers-heading">Papers</a>
      <a class="pub-nav-section" href="#patents-heading">Patents &amp; Others</a>
    `;
  };

  const renderPatents = (container, items) => {
    container.innerHTML = '';

    if(!items.length){
      const empty = document.createElement('p');
      empty.className = 'pub-empty';
      empty.textContent = 'No patents or copyrights listed yet.';
      container.appendChild(empty);
      return;
    }

    for(const p of items){
      const div = document.createElement('div');
      div.className = 'pub-item';
      const title = highlight(p.title);
      const meta = highlight([p.number, p.type].filter(Boolean).join(' · '));
      div.innerHTML = `
        <div class="pub-title">${title}</div>
        ${meta ? `<div class="pub-meta">${meta}</div>` : ''}
      `;
      if(Array.isArray(p.links) && p.links.length){
        const links = document.createElement('div');
        links.className = 'pub-links';
        p.links.forEach((l) => {
          const a = document.createElement('a');
          a.className = 'link';
          a.href = l.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = l.name;
          links.appendChild(a);
        });
        div.appendChild(links);
      }
      container.appendChild(div);
    }
  };

  try{
    const [papersRes, patentsRes] = await Promise.all([
      fetch('data/publications.json?v=8'),
      fetch('data/patents.json?v=2')
    ]);
    const papers = await papersRes.json();
    const patents = await patentsRes.json();
    renderItems(papersContainer, papers);
    renderPatents(patentsContainer, patents);
    buildSidebar();
  }catch(err){
    papersContainer.textContent = 'Failed to load publications.';
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
fetchPublications();
