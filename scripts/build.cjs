(async function(){
 const fs=require('node:fs'), path=require('node:path');
 const config=JSON.parse(fs.readFileSync('site.config.json','utf8'));
 const base='/'+String(config.basePath||'/artikel/').replace(/^\/+|\/+$/g,'')+'/';
 const prefix=base==='//'?'/':base;
 const domain=String(config.siteUrl).replace(/\/$/,'');
 const abs=p=>domain+prefix+String(p||'').replace(/^\//,'');
 const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dest=path.resolve('dist');
 fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});fs.cpSync('assets',path.join(dest,'assets'),{recursive:true});
 const parse=file=>{
  const raw=fs.readFileSync('content/posts/'+file,'utf8').replace(/\r\n/g,'\n'),match=raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if(!match)throw Error('Frontmatter missing in '+file);
  const item={};for(const line of match[1].split('\n')){
   const pair=line.match(/^(\w+):\s*(.*)$/);if(!pair)continue;
   const key=pair[1];let value=pair[2].trim();
   if(value.startsWith('['))value=value.slice(1,-1).split(',').map(v=>v.trim().replace(/^["']|["']$/g,'')).filter(Boolean);
   else if(value==='true'||value==='false')value=value==='true';
   else if(value.startsWith('"')){try{value=JSON.parse(value)}catch{value=value.slice(1,-1)}}
   item[key]=value;
  }
  for(const k of ['title','description','date'])if(!item[k])throw Error('Missing '+k+' in '+file);
  item.slug=file.slice(0,-3);item.category=item.category||'Panduan';
  item.tags=item.tags||[];item.cover=item.cover||'/assets/default.svg';
  item.body=raw.slice(match[0].length).trim();return item;
 };
 const articles=fs.readdirSync('content/posts').filter(f=>f.endsWith('.md')).map(parse).filter(p=>!p.draft).sort((a,b)=>b.date.localeCompare(a.date));
 if(!articles.length)throw Error('No published articles');
 fs.writeFileSync(path.join(dest,'assets/articles.js'),'window.ARTICLES='+JSON.stringify(articles)+';\n');
 const src=name=>fs.readFileSync(name,'utf8').replaceAll('/artikel/',prefix).replaceAll('./assets/',prefix+'assets/');
 const home=src('index.html');
 for(const page of ['index.html','studio.html','about.html'])fs.writeFileSync(path.join(dest,page),src(page));
 const write=(name,data)=>{const target=path.join(dest,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data)};
 for(const a of articles){
  const u=abs('artikel/'+a.slug+'/'),cover=a.cover.startsWith('/')?abs(a.cover):a.cover;
  let html=home.replace(/<title>[^<]*<\/title>/,'<title>'+escape(a.title)+' — Zaidan Journal</title>')
    .replace('content="Zaidan Journal — artikel Android, rooting, modding, dan pengembangan perangkat lunak."','content="'+escape(a.description)+'"')
    .replace('<meta property="og:type" content="website">','<meta property="og:type" content="article">')
    .replace('content="Zaidan Journal"><meta property="og:description"','content="'+escape(a.title)+'"><meta property="og:description"')
    .replace('content="Understand the tech. Own the knowledge."','content="'+escape(a.description)+'"')
    .replace('content="https://zaidanfaiz.github.io/artikel/assets/default.svg"','content="'+escape(cover)+'"')
    .replace('href="https://zaidanfaiz.github.io/artikel/"','href="'+escape(u)+'"')
    .replace('<script src="'+prefix+'assets/app.js"></script>','<script>window.POST_SLUG='+JSON.stringify(a.slug)+';</script><script src="'+prefix+'assets/app.js"></script>');
  const schema=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:a.title,description:a.description,author:{'@type':'Person',name:'Zaidan Faiz'},datePublished:a.date,image:cover,mainEntityOfPage:u}).replaceAll('<','\\u003c');
  html=html.replace('</head>','<script type="application/ld+json">'+schema+'</script></head>');
  write('artikel/'+a.slug+'/index.html',html);
 }
 write('404.html',home.replace('<script src="'+prefix+'assets/app.js"></script>','<script>window.POST_SLUG="404-artikel";</script><script src="'+prefix+'assets/app.js"></script>'));
 const paths=['','about.html','studio.html',...articles.map(a=>'artikel/'+a.slug+'/')];
 write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+escape(abs(p))+'</loc></url>').join('')+'</urlset>');
 write('robots.txt','User-agent: *\nAllow: /\nSitemap: '+abs('sitemap.xml')+'\n');
 write('rss.xml','<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Zaidan Journal</title><link>'+escape(abs(''))+'</link><description>Tutorial Android dan teknologi</description><language>id-ID</language>'+articles.map(a=>'<item><title>'+escape(a.title)+'</title><link>'+escape(abs('artikel/'+a.slug+'/'))+'</link><description>'+escape(a.description)+'</description></item>').join('')+'</channel></rss>');
 if(fs.existsSync('public'))fs.cpSync('public',dest,{recursive:true});
 if(fs.existsSync('CNAME'))fs.copyFileSync('CNAME',path.join(dest,'CNAME'));
 write('.nojekyll','');
 console.log('Build successful: '+articles.length+' articles, individual pages, sitemap, RSS, studio');
})().catch(e=>{console.error(e);process.exit(1)});
