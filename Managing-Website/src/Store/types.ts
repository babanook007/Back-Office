export interface UserData {
    username: string,
    email: string,
    password: string,
  }
  
  export interface UserState {
    data: UserData[];
    error: string | null;
  }
  
  export interface FetchSuccessAction {
    type: "FETCH_SUCCESS";
    payload: UserData[];
  }
  
  export interface FetchErrorAction {
    type: "FETCH_ERROR";
    payload: string;
  }
  
  export type UserActionType = FetchSuccessAction | FetchErrorAction;