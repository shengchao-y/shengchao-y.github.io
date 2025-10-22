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
        // const img = document.createElement('img');
        // img.src = p.image || 'assets/placeholder.svg';
        // img.alt = p.title;
        // wrap.appendChild(img);
        const mediaWrap = document.createElement('div');
        mediaWrap.className = 'thumb';

        const src =
          (p.media && p.media.src) || p.image || 'assets/placeholder.svg';

        const type =
          (p.media && p.media.type) || (/\.(mp4)(\?.*)?$/i.test(src) ? 'video' :
          /\.(pdf)(\?.*)?$/i.test(src) ? 'pdf' : 'image');

        const poster =
          (p.media && p.media.poster) || p.poster || 'assets/placeholder.svg';

        if (type === 'video') {
          const vid = document.createElement('video');
          vid.src = src;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.preload = 'metadata';
          if (poster) vid.poster = poster;
          vid.setAttribute('aria-label', p.title);
          mediaWrap.appendChild(vid);

          const io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) vid.play().catch(()=>{}); else vid.pause(); });
          }, { threshold: 0.25 });
          io.observe(vid);

        } else if (type === 'pdf') {
          // Clickable poster that opens the PDF in a new tab
          const link = document.createElement('a');
          link.href = src;
          link.target = '_blank';
          link.rel = 'noopener';

          const img = document.createElement('img');
          img.src = poster;             // use your generated thumbnail or a generic one
          img.alt = p.title + ' (PDF)';
          link.appendChild(img);

          // Small "PDF" badge
          const badge = document.createElement('span');
          badge.className = 'badge';
          badge.textContent = 'PDF';
          mediaWrap.appendChild(link);
          mediaWrap.appendChild(badge);

          // Optional inline preview (desktop-only) if you set media.inline = true
          const inline = p.media && p.media.inline === true;
          if (inline && window.matchMedia('(min-width: 900px)').matches) {
            const iframe = document.createElement('iframe');
            iframe.src = src + '#toolbar=0&view=fitH';
            iframe.title = p.title + ' (PDF preview)';
            iframe.loading = 'lazy';
            iframe.className = 'pdf-inline';
            mediaWrap.appendChild(iframe);
          }

        } else {
          // image
          const img = document.createElement('img');
          img.src = src || 'assets/placeholder.svg';
          img.alt = p.title;
          mediaWrap.appendChild(img);
        }

        wrap.appendChild(mediaWrap);

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