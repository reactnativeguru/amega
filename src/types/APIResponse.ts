export interface IPAPIResponse {
  borders: string;
  calling_code: string;
  capital: string;
  city: string;
  connection: Connection;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  flag: Flag;
  ip: string;
  is_eu: boolean;
  latitude: number;
  longitude: number;
  postal: string;
  region: string;
  region_code: string;
  success: boolean;
  timezone: Timezone;
  type: string;
}
interface Timezone {
  abbr: string;
  current_time: string;
  id: string;
  is_dst: boolean;
  offset: number;
  utc: string;
}
interface Flag {
  emoji: string;
  emoji_unicode: string;
  img: string;
}
interface Connection {
  asn: number;
  domain: string;
  isp: string;
  org: string;
}
