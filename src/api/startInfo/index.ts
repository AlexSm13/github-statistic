import axios from "axios";

const baseUrl = "https://api.github.com/";
// export default class Api {
//
//     baseUrl: string;
//
//     constructor() {
//
//     }
//
//     getUserInfo(login: string) {
//         return fetch(this.baseUrl + ``)
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     return result || {};
//                 },
//                 (error) => {
//                     console.log(error)
//                 }
//             )
//     }
// }

export async function getStartData(login: string) {
  const { data } = await axios.get(`${baseUrl}users/${login}`);
  console.log(data);
  console.log(data.avatar_url);
  return data;
}
