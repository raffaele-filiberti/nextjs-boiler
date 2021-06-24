export function getStrapiURL(path = ''): string {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const res = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: process.env.NEXT_PUBLIC_GRAPHQL_API_KEY
        ? {
          ...headers,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
        }
        : headers,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
