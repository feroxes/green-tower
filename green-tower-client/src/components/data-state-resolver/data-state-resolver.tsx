import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import Spinner from '../spinner/spinner';

interface DataStateResolverProps<T> {
  query: ReturnType<typeof useQuery<T>>;
  children: (query: ReturnType<typeof useQuery<T>>) => ReactNode;
}

function DataStateResolver<T>({ query, children }: DataStateResolverProps<T>) {
  const { isLoading } = query;

  if (isLoading) return <Spinner />;
  return <>{children(query)}</>;
}

export default DataStateResolver;
