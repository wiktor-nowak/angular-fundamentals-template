export interface AuthorData {
  name: string;
  id: string;
}

export interface AuthorIdResponse {
  successful: boolean;
  result?: AuthorData;
}

export interface AuthorsResponse {
  successful: boolean;
  result?: AuthorData[];
}
