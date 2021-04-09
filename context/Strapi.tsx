import React from 'react';

const StrapiContext = React.createContext<Record<string, never>>({});

export const { Provider: StrapiProvider } = StrapiContext;

export default StrapiContext;
