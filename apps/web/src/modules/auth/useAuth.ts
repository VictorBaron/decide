import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryClient";
import { getMe, logout as apiLogout } from "./auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.me, null);
    },
  });

  return {
    user: user ?? null,
    loading,
    logout: logoutMutation.mutateAsync,
  };
};
