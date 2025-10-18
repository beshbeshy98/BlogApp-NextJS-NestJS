import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors || !result.data) {
    console.error("GraphQL fetch failed:", result);
    throw new Error(
      result.errors?.[0]?.message || "Failed to fetch GraphQL data"
    );
  }

  return result.data;
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors || !result.data) {
    console.error("GraphQL fetch failed:", result);
    throw new Error(
      result.errors?.[0]?.message || "Failed to fetch GraphQL data"
    );
  }

  return result.data;
};
