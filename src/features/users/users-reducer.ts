import type { User } from "@/types/user";

export interface UsersState {
  status: "loading" | "error" | "success";
  users: User[];
  error: string | null;
}

export type UsersAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; users: User[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "ADD_USER"; user: User }
  | { type: "UPDATE_USER"; user: User }
  | { type: "DELETE_USER"; id: string };

export const initialUsersState: UsersState = {
  status: "loading",
  users: [],
  error: null,
};

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading", error: null };
    case "LOAD_SUCCESS":
      return { status: "success", users: action.users, error: null };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.error };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.user] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.user.id ? action.user : u)),
      };
    case "DELETE_USER":
      return { ...state, users: state.users.filter((u) => u.id !== action.id) };
  }
}
