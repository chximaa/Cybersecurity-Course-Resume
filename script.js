/* ============================================================
   script.js — Sécurité Informatique Interactive Course Site
   Pure JavaScript (ES6+), no frameworks
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. DOM READY
───────────────────────────────────────────── */
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
});


/* ─────────────────────────────────────────────
   2. THEME TOGGLE (dark / light)
   Persists to localStorage
───────────────────────────────────────────── */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = '☀';
  } else {
    btn.textContent = '☾';
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Ripple flash on toggle
    flashOverlay();
  });
}

/** Brief full-page flash for visual feedback on theme switch */
function flashOverlay() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; background:var(--accent); opacity:0.08;
    pointer-events:none; z-index:9999; transition:opacity 0.4s ease;
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { overlay.style.opacity = '0'; });
  });
  overlay.addEventListener('transitionend', () => overlay.remove());
}


/* ─────────────────────────────────────────────
   3. TABS (Cours / TD / TP)
   Switches sidebar nav + main content
───────────────────────────────────────────── */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const sidebarNavs = document.querySelectorAll('.sidebar-nav');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update button states
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Fade out current content, fade in new
      const currentContent = document.querySelector('.tab-content.active');
      if (currentContent) {
        currentContent.style.opacity = '0';
        currentContent.style.transform = 'translateY(8px)';
        setTimeout(() => {
          tabContents.forEach(c => c.classList.remove('active'));
          const newContent = document.getElementById(`content-${target}`);
          if (newContent) {
            newContent.classList.add('active');
            requestAnimationFrame(() => {
              newContent.style.opacity = '1';
              newContent.style.transform = 'translateY(0)';
            });
          }
        }, 180);
      }

      // Update sidebar navigation visibility
      sidebarNavs.forEach(nav => {
        nav.classList.add('hidden');
        nav.id === `nav-${target}` && nav.classList.remove('hidden');
      });

      // Scroll content area back to top
      const mainContent = document.getElementById('mainContent');
      if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Apply transition style to tab contents
  tabContents.forEach(c => {
    c.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    c.style.opacity = c.classList.contains('active') ? '1' : '0';
  });
}


/* ─────────────────────────────────────────────
   4. EXPANDABLE ACCORDION SECTIONS
   Smooth height animation, arrow rotation via CSS
───────────────────────────────────────────── */
function initExpandables() {
  const expandables = document.querySelectorAll('.expandable');

  expandables.forEach(el => {
    const btn = el.querySelector('.expand-btn');
    const content = el.querySelector('.expand-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isOpen = el.classList.contains('open');

      // Close all siblings in the same card (optional – comment out for independent)
      // const siblings = el.parentElement.querySelectorAll('.expandable.open');
      // siblings.forEach(s => { if (s !== el) closeExpandable(s); });

      isOpen ? closeExpandable(el) : openExpandable(el);
    });
  });
}

function openExpandable(el) {
  const content = el.querySelector('.expand-content');
  el.classList.add('open');

  // Animate to actual scrollHeight
  content.style.maxHeight = content.scrollHeight + 'px';
  content.style.paddingTop = '16px';
  content.style.paddingBottom = '16px';
}

function closeExpandable(el) {
  const content = el.querySelector('.expand-content');
  // Collapse back
  content.style.maxHeight = '0';
  content.style.paddingTop = '0';
  content.style.paddingBottom = '0';
  el.classList.remove('open');
}


/* ─────────────────────────────────────────────
   5. SIDEBAR — Mobile toggle + overlay
───────────────────────────────────────────── */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  if (!sidebar) return;

  // Create backdrop overlay
  const backdrop = document.createElement('div');
  backdrop.id = 'sidebarBackdrop';
  backdrop.style.cssText = `
    display:none; position:fixed; inset:0; background:rgba(0,0,0,0.45);
    z-index:850; opacity:0; transition:opacity 0.3s ease; backdrop-filter:blur(2px);
  `;
  document.body.appendChild(backdrop);

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.style.display = 'block';
    requestAnimationFrame(() => { backdrop.style.opacity = '1'; });
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => { backdrop.style.display = 'none'; }, 300);
  }

  toggleBtn && toggleBtn.addEventListener('click', openSidebar);
  closeBtn && closeBtn.addEventListener('click', closeSidebar);
  backdrop.addEventListener('click', closeSidebar);

  // Auto-close on nav link click (mobile)
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });
}


/* ─────────────────────────────────────────────
   6. SEARCH — Live filtering across all content
───────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  // Build a searchable index from headings + section text
  const searchIndex = buildSearchIndex();

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        hideResults();
        return;
      }
      const matches = searchIndex.filter(item =>
        item.text.toLowerCase().includes(query)
      ).slice(0, 8);

      renderResults(matches, query);
    }, 180);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) results.classList.add('active');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) hideResults();
  });

  // Keyboard navigation in results
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.search-result-item');
    const focused = results.querySelector('.search-result-item.keyboard-focus');
    if (e.key === 'Escape') { hideResults(); input.blur(); return; }
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = focused ? focused.nextElementSibling : items[0];
      setFocus(focused, next, items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = focused ? focused.previousElementSibling : items[items.length - 1];
      setFocus(focused, prev, items);
    } else if (e.key === 'Enter' && focused) {
      focused.click();
    }
  });

  function setFocus(old, next, all) {
    all.forEach(i => i.classList.remove('keyboard-focus'));
    if (next) {
      next.classList.add('keyboard-focus');
      next.scrollIntoView({ block: 'nearest' });
    }
  }

  function renderResults(matches, query) {
    results.innerHTML = '';
    if (!matches.length) {
      results.innerHTML = `<div class="search-result-item" style="color:var(--text-muted)">Aucun résultat pour "${query}"</div>`;
      results.classList.add('active');
      return;
    }

    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-result-item';

      // Highlight the matched portion
      const idx = item.text.toLowerCase().indexOf(query);
      const before = item.text.slice(0, idx);
      const match = item.text.slice(idx, idx + query.length);
      const after = item.text.slice(idx + query.length, idx + query.length + 60);

      div.innerHTML = `
        <div style="font-weight:600;color:var(--text-primary);font-size:12px;margin-bottom:2px">${item.tab}</div>
        <div>${escapeHtml(before)}<strong>${escapeHtml(match)}</strong>${escapeHtml(after)}${after.length >= 60 ? '…' : ''}</div>
      `;

      div.addEventListener('click', () => {
        // Switch to correct tab first
        switchToTab(item.tabId);
        setTimeout(() => {
          const target = document.getElementById(item.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Brief highlight pulse
            target.style.transition = 'background 0.4s ease';
            target.style.background = 'var(--accent-light)';
            setTimeout(() => { target.style.background = ''; }, 1500);
          }
        }, 200);
        hideResults();
        input.value = '';
      });

      results.appendChild(div);
    });

    results.classList.add('active');
  }

  function hideResults() {
    results.classList.remove('active');
    results.innerHTML = '';
  }
}

/** Build flat searchable index from heading elements + paragraphs */
function buildSearchIndex() {
  const index = [];
  const tabs = [
    { id: 'cours', label: '📖 Cours', contentId: 'content-cours' },
    { id: 'td',    label: '✏️ TD',    contentId: 'content-td'    },
    { id: 'tp',    label: '🔬 TP',    contentId: 'content-tp'    },
  ];

  tabs.forEach(tab => {
    const container = document.getElementById(tab.contentId);
    if (!container) return;

    // Index headings
    container.querySelectorAll('h2,h3,h4,h5,section').forEach(el => {
      if (el.tagName === 'SECTION') {
        const text = el.querySelector('h3,h4,h5')?.textContent?.trim();
        if (text) {
          index.push({ id: el.id, text, tab: tab.label, tabId: tab.id });
        }
      } else if (el.textContent.trim()) {
        index.push({
          id: el.id || el.closest('section')?.id || '',
          text: el.textContent.trim(),
          tab: tab.label,
          tabId: tab.id
        });
      }
    });

    // Index paragraph text
    container.querySelectorAll('p, li, td').forEach(el => {
      const section = el.closest('section');
      const text = el.textContent.trim();
      if (text.length > 20 && section?.id) {
        index.push({ id: section.id, text: text.slice(0, 120), tab: tab.label, tabId: tab.id });
      }
    });
  });

  // Deduplicate
  const seen = new Set();
  return index.filter(item => {
    const key = item.id + item.text.slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function switchToTab(tabId) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) btn.click();
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


/* ─────────────────────────────────────────────
   7. BACK TO TOP BUTTON
───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ─────────────────────────────────────────────
   8. SCROLL SPY — Highlights active sidebar link
───────────────────────────────────────────── */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks)
    .map(l => l.getAttribute('href')?.replace('#', ''))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          const isActive = l.getAttribute('href') === `#${id}`;
          l.classList.toggle('active', isActive);
          // Scroll active link into sidebar view
          if (isActive) {
            l.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}


/* ─────────────────────────────────────────────
   9. SCROLL ANIMATIONS — Cards fade in on entry
───────────────────────────────────────────── */
function initScrollAnimations() {
  const animatables = document.querySelectorAll(
    '.card, .mini-card, .cia-item, .definition-box, .important-box, .warning-box, .remember-box, .example-box, .mistake-box, .formula-box'
  );

  animatables.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  animatables.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   10. READING PROGRESS BAR
───────────────────────────────────────────── */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'readingProgress';
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background: linear-gradient(90deg, var(--accent), var(--purple));
    z-index:1100; transition:width 0.1s linear;
    box-shadow: 0 0 8px var(--accent);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(progress, 100) + '%';
  }, { passive: true });
}


/* ─────────────────────────────────────────────
   11. KEYBOARD SHORTCUTS
───────────────────────────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl+K or Cmd+K → focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('searchInput');
      input?.focus();
      input?.select();
    }

    // Escape → close search / sidebar
    if (e.key === 'Escape') {
      const results = document.getElementById('searchResults');
      results?.classList.remove('active');
    }
  });
}


/* ─────────────────────────────────────────────
   12. NAV LINK SMOOTH SCROLL (with tab switch)
───────────────────────────────────────────── */
function initNavLinkClicks() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      // Determine which tab contains this section
      ['cours', 'td', 'tp'].forEach(tabId => {
        const content = document.getElementById(`content-${tabId}`);
        if (content && content.querySelector(`#${id}`)) {
          const activeTab = document.querySelector('.tab-btn.active');
          if (activeTab?.dataset.tab !== tabId) {
            switchToTab(tabId);
          }
        }
      });

      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    });
  });
}


/* ─────────────────────────────────────────────
   13. COPY CODE BUTTON — Adds copy icon on hover
───────────────────────────────────────────── */
function initCopyCode() {
  document.querySelectorAll('.code-block').forEach(block => {
    // Wrap in relative container if not already
    block.style.position = 'relative';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = '⎘';
    copyBtn.title = 'Copier le code';
    copyBtn.style.cssText = `
      position:absolute; top:8px; right:8px;
      background:var(--accent-light); border:1px solid var(--accent);
      color:var(--accent); border-radius:4px; padding:2px 8px;
      font-size:14px; cursor:pointer; opacity:0;
      transition:opacity 0.2s ease; font-family:inherit;
    `;

    block.appendChild(copyBtn);

    // Show on hover
    block.addEventListener('mouseenter', () => { copyBtn.style.opacity = '1'; });
    block.addEventListener('mouseleave', () => { copyBtn.style.opacity = '0'; });

    copyBtn.addEventListener('click', async () => {
      const code = block.querySelector('code')?.textContent || block.textContent;
      try {
        await navigator.clipboard.writeText(code.replace('⎘', '').trim());
        copyBtn.textContent = '✓';
        copyBtn.style.background = 'var(--green-bg)';
        copyBtn.style.color = 'var(--green)';
        copyBtn.style.borderColor = 'var(--green)';
        setTimeout(() => {
          copyBtn.textContent = '⎘';
          copyBtn.style.background = 'var(--accent-light)';
          copyBtn.style.color = 'var(--accent)';
          copyBtn.style.borderColor = 'var(--accent)';
        }, 1800);
      } catch {
        copyBtn.textContent = '✕';
        setTimeout(() => { copyBtn.textContent = '⎘'; }, 1500);
      }
    });
  });
}


/* ─────────────────────────────────────────────
   14. SUBTLE CARD TILT on hover (desktop only)
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});


/* ─────────────────────────────────────────────
   15. ACTIVE HINT for keyboard shortcut in search
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    // Show Ctrl+K hint in placeholder dynamically
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    input.placeholder = `Rechercher… (${isMac ? '⌘K' : 'Ctrl+K'})`;
  }
});


/* ─────────────────────────────────────────────
   16. TABLE ROW HIGHLIGHT on click (for study)
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.styled-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      // Toggle highlight
      const isHighlighted = row.dataset.highlighted === 'true';
      row.style.background = isHighlighted ? '' : 'var(--accent-light)';
      row.style.borderLeft = isHighlighted ? '' : `3px solid var(--accent)`;
      row.dataset.highlighted = isHighlighted ? 'false' : 'true';
    });
  });
});


/* ─────────────────────────────────────────────
   17. FORMULA BOX pulse on scroll into view
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const formulaBoxes = document.querySelectorAll('.formula-box');
  const pulseObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const formula = entry.target.querySelector('.formula');
        if (formula) {
          formula.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s';
          formula.style.transform = 'scale(1.05)';
          setTimeout(() => { formula.style.transform = 'scale(1)'; }, 450);
        }
        pulseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  formulaBoxes.forEach(box => pulseObserver.observe(box));
});
