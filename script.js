/* ============================================================
   script.js — Sécurité Informatique Interactive Course Site
   Pure JavaScript (ES6+) — No frameworks
   ============================================================ */

'use strict';

/* ── 1. DOM READY ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initExpandables();
  initSidebar();
  initSearch();
  initBackToTop();
  initScrollSpy();
  initScrollAnimations();
  initProgressBar();
  initKeyboardShortcuts();
  initNavLinkClicks();
  initCopyCode();
  initTableRowHighlight();
  initFormulaPulse();
  initCardTilt();
});


/* ── 2. THEME TOGGLE ────────────────────────────────────── */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') { document.body.classList.add('dark'); btn.textContent = '☀'; }
  else { btn.textContent = '☾'; }
  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    flashOverlay();
  });
}

function flashOverlay() {
  const o = document.createElement('div');
  o.style.cssText = 'position:fixed;inset:0;background:var(--accent);opacity:0.06;pointer-events:none;z-index:9999;transition:opacity 0.4s ease;';
  document.body.appendChild(o);
  requestAnimationFrame(() => requestAnimationFrame(() => { o.style.opacity = '0'; }));
  o.addEventListener('transitionend', () => o.remove());
}


/* ── 3. TABS ─────────────────────────────────────────────── */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const sidebarNavs = document.querySelectorAll('.sidebar-nav');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const current = document.querySelector('.tab-content.active');
      if (current) {
        current.style.opacity = '0';
        current.style.transform = 'translateY(8px)';
        setTimeout(() => {
          tabContents.forEach(c => c.classList.remove('active'));
          const newC = document.getElementById(`content-${target}`);
          if (newC) {
            newC.classList.add('active');
            requestAnimationFrame(() => { newC.style.opacity = '1'; newC.style.transform = 'translateY(0)'; });
          }
        }, 180);
      }
      sidebarNavs.forEach(nav => {
        nav.classList.add('hidden');
        if (nav.id === `nav-${target}`) nav.classList.remove('hidden');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  tabContents.forEach(c => {
    c.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    c.style.opacity = c.classList.contains('active') ? '1' : '0';
  });
}


/* ── 4. EXPANDABLE ACCORDION ────────────────────────────── */
function initExpandables() {
  document.querySelectorAll('.expandable').forEach(el => {
    const btn = el.querySelector('.expand-btn');
    const content = el.querySelector('.expand-content');
    if (!btn || !content) return;
    btn.addEventListener('click', () => {
      el.classList.contains('open') ? closeExpandable(el) : openExpandable(el);
    });
  });
}

function openExpandable(el) {
  const c = el.querySelector('.expand-content');
  el.classList.add('open');
  c.style.maxHeight = c.scrollHeight + 'px';
  c.style.paddingTop = '16px';
  c.style.paddingBottom = '16px';
}

function closeExpandable(el) {
  const c = el.querySelector('.expand-content');
  c.style.maxHeight = '0';
  c.style.paddingTop = '0';
  c.style.paddingBottom = '0';
  el.classList.remove('open');
}


/* ── 5. SIDEBAR ─────────────────────────────────────────── */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  if (!sidebar) return;
  const backdrop = document.createElement('div');
  backdrop.id = 'sidebarBackdrop';
  backdrop.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:850;opacity:0;transition:opacity 0.3s ease;backdrop-filter:blur(2px);';
  document.body.appendChild(backdrop);
  const open = () => { sidebar.classList.add('open'); backdrop.style.display='block'; requestAnimationFrame(()=>{backdrop.style.opacity='1';}); document.body.style.overflow='hidden'; };
  const close = () => { sidebar.classList.remove('open'); backdrop.style.opacity='0'; document.body.style.overflow=''; setTimeout(()=>{backdrop.style.display='none';},300); };
  toggleBtn && toggleBtn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  sidebar.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', ()=>{ if(window.innerWidth<=1024) close(); }));
}


/* ── 6. SEARCH ──────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;
  const index = buildSearchIndex();
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { hideResults(); return; }
      const matches = index.filter(i => i.text.toLowerCase().includes(q)).slice(0, 8);
      renderResults(matches, q);
    }, 180);
  });
  input.addEventListener('focus', () => { if (input.value.trim().length >= 2) results.classList.add('active'); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav-search')) hideResults(); });
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.search-result-item');
    const focused = results.querySelector('.search-result-item.keyboard-focus');
    if (e.key==='Escape') { hideResults(); input.blur(); return; }
    if (!items.length) return;
    if (e.key==='ArrowDown') { e.preventDefault(); const nx=focused?focused.nextElementSibling:items[0]; setKFocus(focused,nx,items); }
    else if (e.key==='ArrowUp') { e.preventDefault(); const pv=focused?focused.previousElementSibling:items[items.length-1]; setKFocus(focused,pv,items); }
    else if (e.key==='Enter'&&focused) focused.click();
  });
  function setKFocus(o,n,all) { all.forEach(i=>i.classList.remove('keyboard-focus')); if(n){n.classList.add('keyboard-focus');n.scrollIntoView({block:'nearest'});} }
  function renderResults(matches, q) {
    results.innerHTML='';
    if (!matches.length) { results.innerHTML=`<div class="search-result-item" style="color:var(--text-muted)">Aucun résultat pour "${q}"</div>`; results.classList.add('active'); return; }
    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      const idx = item.text.toLowerCase().indexOf(q);
      const before = item.text.slice(0, idx), match = item.text.slice(idx, idx+q.length), after = item.text.slice(idx+q.length, idx+q.length+60);
      div.innerHTML = `<div style="font-weight:600;color:var(--text-primary);font-size:12px;margin-bottom:2px">${item.tab}</div><div>${esc(before)}<strong>${esc(match)}</strong>${esc(after)}${after.length>=60?'…':''}</div>`;
      div.addEventListener('click', () => {
        switchToTab(item.tabId);
        setTimeout(() => { const t=document.getElementById(item.id); if(t){t.scrollIntoView({behavior:'smooth',block:'start'});t.style.transition='background 0.4s ease';t.style.background='var(--accent-light)';setTimeout(()=>{t.style.background='';},1500);} }, 200);
        hideResults(); input.value='';
      });
      results.appendChild(div);
    });
    results.classList.add('active');
  }
  function hideResults() { results.classList.remove('active'); results.innerHTML=''; }
}

function buildSearchIndex() {
  const index=[], tabs=[{id:'cours',label:'📖 Cours',contentId:'content-cours'},{id:'quiz',label:'🎯 Quiz',contentId:'content-quiz'}];
  tabs.forEach(tab => {
    const container=document.getElementById(tab.contentId);
    if(!container) return;
    container.querySelectorAll('h2,h3,h4,h5,section').forEach(el => {
      if(el.tagName==='SECTION'){const t=el.querySelector('h3,h4,h5')?.textContent?.trim();if(t)index.push({id:el.id,text:t,tab:tab.label,tabId:tab.id});}
      else if(el.textContent.trim())index.push({id:el.id||el.closest('section')?.id||'',text:el.textContent.trim(),tab:tab.label,tabId:tab.id});
    });
    container.querySelectorAll('p,li,td').forEach(el => {
      const section=el.closest('section'),text=el.textContent.trim();
      if(text.length>20&&section?.id)index.push({id:section.id,text:text.slice(0,120),tab:tab.label,tabId:tab.id});
    });
  });
  const seen=new Set();
  return index.filter(item=>{const k=item.id+item.text.slice(0,30);if(seen.has(k))return false;seen.add(k);return true;});
}

function switchToTab(tabId) { const btn=document.querySelector(`.tab-btn[data-tab="${tabId}"]`); if(btn) btn.click(); }
function esc(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }


/* ── 7. BACK TO TOP ─────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY>400), {passive:true});
  btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}


/* ── 8. SCROLL SPY ──────────────────────────────────────── */
function initScrollSpy() {
  const navLinks=document.querySelectorAll('.nav-link[href^="#"]');
  if(!navLinks.length) return;
  const ids=Array.from(navLinks).map(l=>l.getAttribute('href')?.replace('#','')).filter(Boolean);
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id=entry.target.id;
        navLinks.forEach(l=>{const isA=l.getAttribute('href')===`#${id}`;l.classList.toggle('active',isA);if(isA)l.scrollIntoView({block:'nearest',behavior:'smooth'});});
      }
    });
  },{rootMargin:'-20% 0px -70% 0px',threshold:0});
  ids.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el);});
}


/* ── 9. SCROLL ANIMATIONS ───────────────────────────────── */
function initScrollAnimations() {
  const els=document.querySelectorAll('.card,.mini-card,.cia-item,.definition-box,.important-box,.warning-box,.remember-box,.example-box,.mistake-box,.formula-box');
  els.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(16px)';el.style.transition='opacity 0.45s ease, transform 0.45s ease';});
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  els.forEach(el=>obs.observe(el));
}


/* ── 10. PROGRESS BAR ───────────────────────────────────── */
function initProgressBar() {
  const bar=document.createElement('div');
  bar.id='readingProgress';
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,var(--accent),var(--purple));z-index:1100;transition:width 0.1s linear;box-shadow:0 0 8px var(--accent);';
  document.body.appendChild(bar);
  window.addEventListener('scroll',()=>{const p=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;bar.style.width=Math.min(p,100)+'%';},{passive:true});
}


/* ── 11. KEYBOARD SHORTCUTS ─────────────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey||e.metaKey)&&e.key==='k') { e.preventDefault(); const i=document.getElementById('searchInput'); i?.focus(); i?.select(); }
    if (e.key==='Escape') document.getElementById('searchResults')?.classList.remove('active');
  });
  const input=document.getElementById('searchInput');
  if(input){const isMac=navigator.platform.toUpperCase().includes('MAC');input.placeholder=`Rechercher… (${isMac?'⌘K':'Ctrl+K'})`;}
}


/* ── 12. NAV LINK SMOOTH SCROLL ─────────────────────────── */
function initNavLinkClicks() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const id=link.getAttribute('href').replace('#','');
      ['cours','quiz'].forEach(tabId=>{const c=document.getElementById(`content-${tabId}`);if(c&&c.querySelector(`#${id}`)){const aT=document.querySelector('.tab-btn.active');if(aT?.dataset.tab!==tabId)switchToTab(tabId);}});
      setTimeout(()=>{const t=document.getElementById(id);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});},250);
    });
  });
}


/* ── 13. COPY CODE ──────────────────────────────────────── */
function initCopyCode() {
  document.querySelectorAll('.code-block').forEach(block=>{
    block.style.position='relative';
    const btn=document.createElement('button');
    btn.textContent='⎘'; btn.title='Copier le code';
    btn.style.cssText='position:absolute;top:8px;right:8px;background:var(--accent-light);border:1px solid var(--accent);color:var(--accent);border-radius:4px;padding:2px 8px;font-size:14px;cursor:pointer;opacity:0;transition:opacity 0.2s ease;font-family:inherit;';
    block.appendChild(btn);
    block.addEventListener('mouseenter',()=>{btn.style.opacity='1';});
    block.addEventListener('mouseleave',()=>{btn.style.opacity='0';});
    btn.addEventListener('click',async()=>{
      const code=(block.querySelector('code')?.textContent||block.textContent).replace('⎘','').trim();
      try { await navigator.clipboard.writeText(code); btn.textContent='✓'; btn.style.background='var(--green-bg)'; btn.style.color='var(--green)'; btn.style.borderColor='var(--green)'; setTimeout(()=>{btn.textContent='⎘';btn.style.background='var(--accent-light)';btn.style.color='var(--accent)';btn.style.borderColor='var(--accent)';},1800); }
      catch { btn.textContent='✕'; setTimeout(()=>{btn.textContent='⎘';},1500); }
    });
  });
}


/* ── 14. TABLE ROW HIGHLIGHT ────────────────────────────── */
function initTableRowHighlight() {
  document.querySelectorAll('.styled-table tbody tr').forEach(row=>{
    row.style.cursor='pointer';
    row.addEventListener('click',()=>{
      const isH=row.dataset.highlighted==='true';
      row.style.background=isH?'':'var(--accent-light)'; row.style.borderLeft=isH?'':`3px solid var(--accent)`; row.dataset.highlighted=isH?'false':'true';
    });
  });
}


/* ── 15. FORMULA PULSE ──────────────────────────────────── */
function initFormulaPulse() {
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){const f=e.target.querySelector('.formula');if(f){f.style.transition='transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';f.style.transform='scale(1.05)';setTimeout(()=>{f.style.transform='scale(1)';},450);}obs.unobserve(e.target);}
    });
  },{threshold:0.5});
  document.querySelectorAll('.formula-box').forEach(b=>obs.observe(b));
}


/* ── 16. CARD TILT ──────────────────────────────────────── */
function initCardTilt() {
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(600px) rotateX(${-y*2}deg) rotateY(${x*2}deg) translateY(-2px)`;});
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
}


/* ════════════════════════════════════════════════════════════
   QUIZ ENGINE
════════════════════════════════════════════════════════════ */

let quizState = {
  current: 0,
  answers: [],        // {questionIndex, selectedOption, isCorrect}
  score: 0,
  started: false,
  finished: false
};

function startQuiz() {
  // Switch to quiz tab if not already
  const quizBtn = document.querySelector('.tab-btn[data-tab="quiz"]');
  if (quizBtn && !quizBtn.classList.contains('active')) quizBtn.click();

  quizState = { current: 0, answers: new Array(QUIZ_DATA.length).fill(null), score: 0, started: true, finished: false };
  showScreen('quiz-question');
  renderQuestion(0);
}

function resetQuiz() {
  quizState = { current: 0, answers: new Array(QUIZ_DATA.length).fill(null), score: 0, started: false, finished: false };
  showScreen('quiz-start');
}

function showScreen(id) {
  document.querySelectorAll('.quiz-screen').forEach(s => s.classList.add('hidden'));
  const t = document.getElementById(id);
  if (t) { t.classList.remove('hidden'); t.scrollIntoView({behavior:'smooth', block:'start'}); }
}

function renderQuestion(idx) {
  const q = QUIZ_DATA[idx];
  const total = QUIZ_DATA.length;

  // Progress
  const pct = (idx / total) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('questionCounter').textContent = `Question ${idx + 1}/${total}`;
  document.getElementById('scoreDisplay').textContent = `Score : ${quizState.score}`;

  // Chapter badge
  const badge = document.getElementById('chapterBadge');
  badge.textContent = q.chapter;
  badge.className = 'quiz-chapter-badge ' + getChapterClass(q.chapter);

  // Question text
  const typeLabel = q.type === 'vf' ? '🔵 Vrai ou Faux' : '🟢 QCM';
  document.getElementById('questionText').innerHTML = `<span class="q-type-label">${typeLabel}</span>${q.question}`;

  // Options
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.dataset.index = i;

    // Restore previous answer state if exists
    const saved = quizState.answers[idx];
    if (saved !== null) {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === saved.selected) btn.classList.add('incorrect');
    }

    btn.addEventListener('click', () => selectAnswer(idx, i));
    container.appendChild(btn);
  });

  // Explanation
  const expBox = document.getElementById('explanationBox');
  const expText = document.getElementById('explanationText');
  const saved = quizState.answers[idx];
  if (saved !== null) {
    expText.innerHTML = `<strong>${saved.isCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse.'}</strong><br><br>${q.explanation}`;
    expBox.classList.remove('hidden');
  } else {
    expBox.classList.add('hidden');
  }

  // Nav buttons
  document.getElementById('prevBtn').disabled = idx === 0;
  const nextBtn = document.getElementById('nextBtn');
  if (idx === total - 1) {
    nextBtn.textContent = 'Terminer le quiz ✓';
    nextBtn.onclick = finishQuiz;
  } else {
    nextBtn.textContent = 'Suivant →';
    nextBtn.onclick = nextQuestion;
  }
  nextBtn.disabled = quizState.answers[idx] === null;
}

function getChapterClass(chapter) {
  if (chapter.includes('1')) return 'badge-ch1';
  if (chapter.includes('2')) return 'badge-ch2';
  if (chapter.includes('3')) return 'badge-ch3';
  if (chapter.includes('4')) return 'badge-ch4';
  return '';
}

function selectAnswer(qIdx, optIdx) {
  if (quizState.answers[qIdx] !== null) return; // Already answered
  const q = QUIZ_DATA[qIdx];
  const isCorrect = optIdx === q.answer;
  quizState.answers[qIdx] = { selected: optIdx, isCorrect };
  if (isCorrect) quizState.score++;

  // Update score display
  document.getElementById('scoreDisplay').textContent = `Score : ${quizState.score}`;

  // Visually mark options
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === optIdx && !isCorrect) btn.classList.add('incorrect');
  });

  // Show explanation
  const expBox = document.getElementById('explanationBox');
  const expText = document.getElementById('explanationText');
  expText.innerHTML = `<strong>${isCorrect ? '✅ Bonne réponse !' : `❌ Mauvaise réponse. La bonne réponse était : "${q.options[q.answer]}"`}</strong><br><br>${q.explanation}`;
  expBox.classList.remove('hidden');
  expBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Enable next button
  document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
  if (quizState.current < QUIZ_DATA.length - 1) {
    quizState.current++;
    renderQuestion(quizState.current);
    document.getElementById('quiz-question').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function prevQuestion() {
  if (quizState.current > 0) {
    quizState.current--;
    renderQuestion(quizState.current);
    document.getElementById('quiz-question').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function finishQuiz() {
  quizState.finished = true;
  showScreen('quiz-results');
  const total = QUIZ_DATA.length;
  const score = quizState.score;
  const pct = Math.round((score / total) * 100);

  // Icon & title based on score
  let icon, title, msg;
  if (pct >= 80) { icon='🏆'; title='Excellent travail !'; msg=`Vous maîtrisez très bien le cours de cybersécurité. Score : ${score}/${total} (${pct}%)`;  }
  else if (pct >= 60) { icon='👍'; title='Bon résultat !'; msg=`Une bonne maîtrise du cours. Quelques révisions s'imposent. Score : ${score}/${total} (${pct}%)`; }
  else if (pct >= 40) { icon='📚'; title='Résultat moyen'; msg=`Des efforts de révision sont nécessaires. Score : ${score}/${total} (${pct}%)`; }
  else { icon='💪'; title='À retravailler'; msg=`Relisez attentivement le cours et réessayez ! Score : ${score}/${total} (${pct}%)`; }

  document.getElementById('resultsIcon').textContent = icon;
  document.getElementById('resultsTitle').textContent = title;
  document.getElementById('finalScore').textContent = `${score}/${total}`;
  document.getElementById('resultsMessage').textContent = msg;

  // Score circle color
  const circle = document.getElementById('scoreCircle');
  circle.className = 'score-circle ' + (pct >= 80 ? 'score-excellent' : pct >= 60 ? 'score-good' : pct >= 40 ? 'score-medium' : 'score-low');

  // Breakdown by chapter
  const chapters = {};
  QUIZ_DATA.forEach((q, i) => {
    if (!chapters[q.chapter]) chapters[q.chapter] = { total: 0, correct: 0 };
    chapters[q.chapter].total++;
    if (quizState.answers[i]?.isCorrect) chapters[q.chapter].correct++;
  });
  const bd = document.getElementById('resultsBreakdown');
  bd.innerHTML = '<h4 style="margin-bottom:12px">Résultats par chapitre :</h4>';
  Object.entries(chapters).forEach(([ch, data]) => {
    const p = Math.round((data.correct / data.total) * 100);
    bd.innerHTML += `
      <div class="breakdown-item">
        <div class="breakdown-label">${ch}</div>
        <div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:${p}%"></div></div>
        <div class="breakdown-score">${data.correct}/${data.total} (${p}%)</div>
      </div>`;
  });
}

function reviewAnswers() {
  showScreen('quiz-review');
  const container = document.getElementById('reviewContainer');
  container.innerHTML = '';
  QUIZ_DATA.forEach((q, i) => {
    const ans = quizState.answers[i];
    const isCorrect = ans?.isCorrect;
    const div = document.createElement('div');
    div.className = `card review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}`;
    const typeLabel = q.type === 'vf' ? 'Vrai/Faux' : 'QCM';
    div.innerHTML = `
      <div class="review-header">
        <span class="review-num">Q${i + 1}</span>
        <span class="review-type">${typeLabel}</span>
        <span class="review-chapter">${q.chapter}</span>
        <span class="review-result">${isCorrect ? '✅' : '❌'}</span>
      </div>
      <p class="review-question">${q.question}</p>
      <div class="review-options">
        ${q.options.map((opt, oi) => `
          <div class="review-option ${oi===q.answer?'review-opt-correct':''} ${ans?.selected===oi&&!isCorrect&&oi!==q.answer?'review-opt-wrong':''}">
            ${oi===q.answer?'✓ ':ans?.selected===oi&&!isCorrect?'✗ ':'  '}${opt}
          </div>`).join('')}
      </div>
      <div class="review-explanation">${q.explanation}</div>`;
    container.appendChild(div);
  });
}
