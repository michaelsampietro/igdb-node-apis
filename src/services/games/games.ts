import { VideoGame } from "../../types/game";
import { igdbAxiosInstance } from "../igdb/igdbAxiosInstance";

export async function listGames(page?: number): Promise<VideoGame[]> {
  const queryString = `
    fields id, name, rating, checksum, first_release_date, name, rating, slug, storyline, summary, total_rating, url, version_title, videos, websites, platforms.id, platforms.name, websites.url, franchises.name, game_modes.name, screenshots.url, screenshots.url, screenshots.height, screenshots.image_id;
    where platforms != n;
  `
  const queryWithPagination = queryString.concat(`offset ${page ?? 0 * 20};limit 20;`);
  const { data } = await igdbAxiosInstance.post<VideoGame[]>('games', queryWithPagination);
  return data ?? [];
}