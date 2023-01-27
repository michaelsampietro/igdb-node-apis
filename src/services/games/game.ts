import { VideoGame } from "../../types/game";
import { igdbAxiosInstance } from "../igdb/igdbAxiosInstance";

export async function searchGame(gameId: number): Promise<VideoGame[]> {
  const queryString = `
    fields id, name, rating, checksum, first_release_date, name, rating, slug, storyline, summary, total_rating, url, version_title, videos, websites, platforms.id, platforms.name, websites.url, franchises.name, game_modes.name, screenshots.url, screenshots.url, screenshots.height, screenshots.image_id;
    where platforms != n & id = ${gameId};
  `

  const { data } = await igdbAxiosInstance.post<VideoGame[]>('games', queryString);
  return data ?? [];
}