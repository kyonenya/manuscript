export const fetcher = <UseCase>(endpoint: string) /* : UseCase */ => {
  return (async (request: unknown /* UseCaseInput */) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json() /* UseCaseOutput */;
  }) as unknown as UseCase;
};
