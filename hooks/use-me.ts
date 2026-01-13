import { useEffect } from 'react';
import { useUserStore } from '@/data/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { MeResponse } from '@/domain/types/user.type';
import { meService } from '@/data/services/user.service';

export function useMe() {
  const { data, isLoading, isError } = useQuery<MeResponse | null>({
    queryKey: ['me'],
    queryFn: () => meService(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
    }
  }, [data, isError, setUser]);

  return {
    user: data ?? null,
    loading: isLoading,
    isAuthenticated: !!data,
    setUser,
  };
}