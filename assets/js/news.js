async function fetchNews(){
  const container = document.getElementById('news-list');
  if(!container) return;
  try{
    const res = await fetch('data/news.json?v=14');
    const items = await res.json();
    container.innerHTML = '';
    items.forEach((item) => {
      const text = item.text || [item.title, item.description].filter(Boolean).join(' ');
      const article = document.createElement('article');
      article.className = 'news-item';
      const newTag = item.new
        ? '<span class="news-new">New!</span>'
        : '';
      const location = item.location
        ? `<div class="news-location">${item.location}</div>`
        : '<div class="news-location"></div>';
      article.innerHTML = `
        <time class="news-date" datetime="">${item.date}</time>
        <span class="news-text">${text}${newTag}</span>
        ${location}
      `;
      container.appendChild(article);
    });
  }catch(err){
    container.textContent = 'Failed to load news.';
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
fetchNews();
