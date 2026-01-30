import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  proposals: {
    all: ["proposals"] as const,
    detail: (id: string) => ["proposals", id] as const,
  },
  decisions: {
    all: ["decisions"] as const,
    detail: (id: string) => ["decisions", id] as const,
    byProposal: (proposalId: string) => ["decisions", "byProposal", proposalId] as const,
  },
  users: {
    all: ["users"] as const,
  },
} as const;
