import type {
  DecisionProposal,
  DecisionOption,
  CreateDecisionProposalInput,
  UpdateDecisionProposalInput,
  AddOptionInput,
  User,
  DecisionProposalDTO,
} from "./types";
import { DecisionProposalMapper } from "./decisionProposal.mapper";
import { handleResponse } from "../../common/api";

const BASE_URL = "/api/v1/decision-proposals";

async function convertDTOtoProposal(
  dto: DecisionProposalDTO | DecisionProposalDTO[],
): Promise<DecisionProposal | DecisionProposal[]> {
  if (Array.isArray(dto)) {
    return dto.map(DecisionProposalMapper.toDecisionProposal);
  }
  return DecisionProposalMapper.toDecisionProposal(dto);
}

export async function fetchProposals(): Promise<DecisionProposal[]> {
  const response = await fetch(BASE_URL, { credentials: "include" });
  const result = await handleResponse<DecisionProposalDTO[]>(response);

  return convertDTOtoProposal(result) as Promise<DecisionProposal[]>;
}

export async function fetchProposal(id: string): Promise<DecisionProposal> {
  const response = await fetch(`${BASE_URL}/${id}`, { credentials: "include" });

  const result = await handleResponse<DecisionProposalDTO>(response);

  return convertDTOtoProposal(result) as Promise<DecisionProposal>;
}

export async function createProposal(
  data: CreateDecisionProposalInput,
): Promise<DecisionProposal> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return convertDTOtoProposal(
    await handleResponse<DecisionProposalDTO>(res),
  ) as Promise<DecisionProposal>;
}

export async function updateProposal(
  id: string,
  data: UpdateDecisionProposalInput,
): Promise<DecisionProposal> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return convertDTOtoProposal(
    await handleResponse<DecisionProposalDTO>(res),
  ) as Promise<DecisionProposal>;
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
  data: AddOptionInput,
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
  optionId: string,
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
