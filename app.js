async function loadPubs(){
  const root = document.getElementById('pubs-root');
  try{
    const res = await fetch('publications.json');
    const data = await res.json();
    const years = [...new Set(data.map(p => p.year))].sort((a,b)=>b-a);
    for(const y of years){
      const h = document.createElement('h3');
      h.textContent = `— ${y} —`;
      root.appendChild(h);

      for(const p of data.filter(pp=>pp.year===y)){
        const wrap = document.createElement('div');
        wrap.className = 'card';
        wrap.style.display = 'grid';
        wrap.style.gridTemplateColumns = '160px 1fr';
        wrap.style.gap = '12px';
        const img = document.createElement('img');
        img.src = p.image || 'assets/placeholder.svg';
        img.alt = p.title;
        wrap.appendChild(img);

        const info = document.createElement('div');
        const t = document.createElement('div');
        t.className = 'title';
        t.textContent = p.title;
        const a = document.createElement('div');
        a.className = 'meta';
        a.innerHTML = p.authors.replace(/Shengchao Yan/g, '<b>Shengchao Yan</b>');
        const v = document.createElement('div');
        v.className = 'meta';
        v.textContent = p.venue + (p.note? (' · ' + p.note) : '');

        const links = document.createElement('p');
        links.innerHTML = [
          p.project && `<a href="${p.project}" target="_blank" rel="noopener">Project page</a>`,
          p.paper && `<a href="${p.paper}" target="_blank" rel="noopener">Paper</a>`,
          p.code && `<a href="${p.code}" target="_blank" rel="noopener">Code</a>`
        ].filter(Boolean).join('  ');

        info.appendChild(t); info.appendChild(a); info.appendChild(v); info.appendChild(links);
        wrap.appendChild(info);
        root.appendChild(wrap);
      }
    }
  }catch(e){
    root.textContent = 'Failed to load publications.';
  }
  document.getElementById('y').textContent = new Date().getFullYear();
}
loadPubs();