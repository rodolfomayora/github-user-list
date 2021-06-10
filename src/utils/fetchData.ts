/** Github Rest API Endpoints
 * 
 * Base: https://api.github.com
 * Users: https://api.github.com/users
 *  parameters:
 *    - since: A user ID. Only return users with an ID greater than this ID.
 *    - per_page: number of item to get (max 100)
 * Users per page: https://api.github.com/users?since={userId}&per_page={quantity}
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

const fetchResponse = async (params: FetchParams): Promise<Response> => {

  const { url, method = 'GET', token = null } = params;
  const objectRequest: any = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  if (!!token) objectRequest.headers.Authorization = `Bearer: ${token}`;
  const response: Response = await window.fetch(url);
  if (!response.ok) throw new Error();
  return response;
}

export const fetchData = async (params: FetchParams): Promise<any> => {
  const response: Response = await fetchResponse(params);
  const data: any = await response.json();
  return data;
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

const getSinceParamValue = (headerLinks: string): number => {

  const isLast: boolean = !headerLinks.includes('next');
  if (isLast) return 0;

  const param: string = 'since=';
  const init: number = headerLinks.indexOf(param) + param.length;
  const end: number = headerLinks.indexOf('>');
  return Number(headerLinks.slice(init, end));
}

type ObjectListResponse = {
  userList: Array<any>,
  nextListOrigin: number
}

const fetchDataWithNextOriginList = async (params: FetchParams): Promise<ObjectListResponse> => {
  const response: Response = await fetchResponse(params);
  const userList: any = await response.json();
  const headerLinks: string = String(response.headers.get('Link'));
  const nextListOrigin: number = getSinceParamValue(headerLinks);
  
  return ({
    userList,
    nextListOrigin
  });
}

export const fetchUsersPerPage = async (perPage: number, sinceId?: number): Promise<ObjectListResponse> => {
  const params: string = `?per_page=${perPage}&since=${sinceId ?? 0}`;
  const url: string = `${usersURL}${params}`;
  const objectDaraResponse: any = await fetchDataWithNextOriginList({ url });
  return objectDaraResponse;
}