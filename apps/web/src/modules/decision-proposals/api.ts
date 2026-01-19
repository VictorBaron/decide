import type {
  DecisionProposal,
  DecisionOption,
  CreateDecisionProposalInput,
  UpdateDecisionProposalInput,
  AddOptionInput,
  User,
} from "./types";

const BASE_URL = "/api/v1/decision-proposals";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export async function fetchProposals(): Promise<DecisionProposal[]> {
  const res = await fetch(BASE_URL, { credentials: "include" });
  return handleResponse(res);
}

export async function fetchProposal(id: string): Promise<DecisionProposal> {
  const res = await fetch(`${BASE_URL}/${id}`, { credentials: "include" });
  return handleResponse(res);
}

export async function createProposal(
  data: CreateDecisionProposalInput
): Promise<DecisionProposal> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateProposal(
  id: string,
  data: UpdateDecisionProposalInput
): Promise<DecisionProposal> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteProposal(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Delete failed" }));
    throw new Error(error.message || "Delete failed");
  }
}

export async function addOption(
  proposalId: string,
  data: AddOptionInput
): Promise<DecisionOption> {
  const res = await fetch(`${BASE_URL}/${proposalId}/options`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function removeOption(
  proposalId: string,
  optionId: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/${proposalId}/options/${optionId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "Remove option failed" }));
    throw new Error(error.message || "Remove option failed");
  }
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/v1/users", { credentials: "include" });
  return handleResponse(res);
}
