export function productionTarget(value) {
  if (!value) throw new Error('Set PRODUCTION_BASE_URL explicitly after launch approval.');
  const url = new URL(value);
  if (url.origin !== 'https://hydrorigor.com' || url.username || url.password
      || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Production target must be exactly https://hydrorigor.com/ without credentials.');
  }
  return url.origin;
}
