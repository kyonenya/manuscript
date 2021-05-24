export const fetcher = (endpoint: string) => async (request: unknown) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};
