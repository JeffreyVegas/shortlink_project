export type Url = {
  _id?: string;
  description: string;
  url: string;
  shortUrl?: string;
  numberClicks?: number;
  user?: string;
  createdAt?: Date | undefined;
};

export interface UrlState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  urls: Url[];
  lastUrl: Url | null;
  message: string | undefined | null;
}
