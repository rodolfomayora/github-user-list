/** Github Rest API Endpoints
 * Base: https://api.github.com
 * Users: https://api.github.com/users
 *  parameters:
 *    - per_page: number of item to get (max 100)
 *    - since: A user ID. Only return users with an ID greater than this ID.
 * Especific user: https://api.github.com/users/{userName}
 * Repositories per user: https://api.github.com/users/{userName}/repos 
 */

const baseURL: string = 'https://api.github.com';
const usersURL: string = `${baseURL}/users`;
const userInfoURL = (userName: string): string => `${usersURL}/${userName}`;
const userRepositoriesURL = (userName: string): string => `${usersURL}/${userName}/repos`;

type FetchParams = {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  token?: string | null
}

export const fetchData = async ({ url, method = 'GET', token = null }: FetchParams) => {
  const objectRequest: any = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (!!token) objectRequest.headers.Authorization = `Bearer: ${token}`;
  const response: Response = await window.fetch(url);
  if (!response.ok) throw new Error();
  const data: any = await response.json();
  return data;
}

export const fetchUsers = (quantity: number) => {
  const params: string = `?per_page=${quantity}`;
  const url: string = `${usersURL}${params}`;
  return fetchData({ url });
}

export const fetchUserData = async (userName: string) => {
  const userDataURL: string = userInfoURL(userName);
  const repositoriesURL: string = userRepositoriesURL(userName);

  const userData: any = await fetchData({ url: userDataURL });
  const userRepositories: any = await fetchData({ url: repositoriesURL });

  return {
    ...userData,
    allRepositories: [...userRepositories]
  }
}