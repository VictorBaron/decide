import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { User } from "./types";
import { queryKeys } from "../../common/queryClient";
import { fetchUsers } from "./api";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersReturn {
  const {
    data: users = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.users.all,
    queryFn: fetchUsers,
  });

  return useMemo(
    () => ({
      users,
      loading,
      error: error instanceof Error ? error.message : null,
    }),
    [users, loading, error]
  );
}
