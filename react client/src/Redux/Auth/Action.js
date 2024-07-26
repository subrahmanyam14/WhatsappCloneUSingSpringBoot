import { BASE_URL } from "../../Config/Api";
import {
  LOGIN,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  const res = await fetch(`http://localhost:5454/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  console.log("register", user);
  if (user.jwt) localStorage.setItem("token", user.jwt);
  dispatch({ type: REGISTER, payload: user });
};

export const login = (data) => async (dispatch) => {
  const res = await fetch(`http://localhost:5454/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  if (user.jwt) localStorage.setItem("token", user.jwt);

  dispatch({ type: LOGIN, payload: user });
};

export const currentUser = (token) => async (dispatch) => {
  console.log("token req profile ------ ", token);

  try {
    const res = await fetch(`${BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await res.json();
    console.log("req user profile ", user);
    dispatch({ type: REQ_USER, payload: user });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/users/search?name=${data.keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  });
  const user = await res.json();
  const temp = user.filter((item) => item.id !== data.userId);
  dispatch({ type: SEARCH_USER, payload: temp });
};

export const updateUser = (data) => async (dispatch) => {
  console.log("update user data - ",data)
  try {
    const res = await fetch(`${BASE_URL}/users/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.data),
    });
    const user = await res.json();
    console.log("updated user", user);
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {console.log("catch error ",error)}
};
