export type GeoType = {
  lat: string;
  lng: string;
};

export type AddressType = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoType;
};

export type CompanyType = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressType;
  phone: string;
  website: string;
  company: CompanyType;
};

export type PostType = {
  userId: number;
  id: string;
  title: string;
  content: string;
};

export type CommentType = {
  postId: string | undefined;
  id: string;
  username: string;
  email: string;
  body: string;
};
