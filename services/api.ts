import { API_URL } from "@/constants";
import axios from "axios";

interface ITimelineGame {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  userId: number;
  createdAt: string;
  _count: { reviews: number; votes: number };
  createdBy: { name: string; id: number; username: string };
}

interface IGame {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  userId: number;
  createdAt: string;
  _count: { votes: number; reviews: number };
  reviews: IReview[];
  createdBy: { name: string; id: number; username: string };
}

interface IReview {
  id: number;
  text: string;
  userId: number;
  createdAt: string;
  gameId: number;
  createdBy: { name: string; id: number; username: string };
}

export interface IUser {
  id: number;
  name: string;
  type: string;
  username: string;
  createdAt: string;
  _count: {
    games: number;
    reviews: number;
    votes: number;
  };
}
export namespace API {
  export async function fetchTimeline(): Promise<ITimelineGame[]> {
    const res = (await axios.get(API_URL + "/game/timeline")) as any;
    return res.data.games;
  }
  export async function fetchGame(id: number): Promise<IGame> {
    const res = (await axios.get(API_URL + "/game/get/" + id)) as any;
    return res.data;
  }
  export async function fetchCurrentUser(): Promise<IUser> {
    const token = localStorage.getItem("token");

    const res = (await axios.get(API_URL + "/user/get", {
      headers: { Authorization: "Bearer " + token },
    })) as any;
    return res.data;
  }
  export async function loginUser(
    username: string,
    pass: string
  ): Promise<{ token: string }> {
    const res = (await axios.post(API_URL + "/user/login", {
      username,
      password: pass,
    })) as any;
    return res.data;
  }
}
