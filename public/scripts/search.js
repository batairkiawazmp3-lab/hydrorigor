const form = document.querySelector('#site-search');
const input = document.querySelector('#search-query');
const statusElement = document.querySelector('#search-status');
const results = document.querySelector('#search-results');

if (form && input && statusElement && results) {
  let pagefindPromise;

  const loadPagefind = async () => {
    pagefindPromise ??= import('/pagefind/pagefind.js').then(async (pagefind) => {
      await pagefind.init();
      return pagefind;
    });
    return pagefindPromise;
  };

  const clearResults = () => results.replaceChildren();

  const renderResult = (result) => {
    const item = document.createElement('li');
    item.className = 'rounded-2xl border border-hydro-deep/10 bg-white p-6 shadow-[0_10px_30px_rgb(11_61_59_/_0.04)]';

    const link = document.createElement('a');
    link.className = 'hr-focus rounded-md font-heading text-xl font-bold text-hydro-deep no-underline hover:text-hydro-teal';
    link.href = result.url;
    link.textContent = result.meta?.title || result.url;

    const excerpt = document.createElement('p');
    excerpt.className = 'mt-3 text-sm leading-6 text-slate';
    excerpt.textContent = result.plain_excerpt || 'Open this page to read more.';

    item.append(link, excerpt);
    return item;
  };

  const runSearch = async (rawQuery) => {
    const query = rawQuery.trim();
    clearResults();

    if (!query) {
      statusElement.textContent = 'Enter a search term to begin.';
      return;
    }

    statusElement.textContent = `Searching for “${query}”…`;

    try {
      const pagefind = await loadPagefind();
      const response = await pagefind.search(query);
      const loaded = await Promise.all(response.results.slice(0, 20).map((result) => result.data()));

      if (loaded.length === 0) {
        statusElement.textContent = `No results found for “${query}”. Try a broader topic or use Start Here.`;
        return;
      }

      statusElement.textContent = `${loaded.length} result${loaded.length === 1 ? '' : 's'} for “${query}”.`;
      results.append(...loaded.map(renderResult));
    } catch {
      statusElement.textContent = 'Search could not load. Use the topic navigation or try again after the static site build completes.';
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    runSearch(query);
  });

  input.addEventListener('focus', () => { void loadPagefind(); }, { once: true });

  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  if (initialQuery) {
    input.value = initialQuery;
    runSearch(initialQuery);
  }
}
