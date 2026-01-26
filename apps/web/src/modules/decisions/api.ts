import type { Decision, MakeDecisionInput } from "./types";

const BASE_URL = "/api/v1/decisions";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export async function makeDecision(data: MakeDecisionInput): Promise<Decision> {
  const res = await fetch(`${BASE_URL}/make`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function fetchDecisions(): Promise<Decision[]> {
  const res = await fetch(BASE_URL, { credentials: "include" });
  return handleResponse(res);
}

export async function fetchDecision(id: string): Promise<Decision> {
  const res = await fetch(`${BASE_URL}/${id}`, { credentials: "include" });
  return handleResponse(res);
}

export async function fetchDecisionByProposal(
  proposalId: string
): Promise<Decision | null> {
  const res = await fetch(`${BASE_URL}/by-proposal/${proposalId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  const data = await res.json();
  return data;
}
