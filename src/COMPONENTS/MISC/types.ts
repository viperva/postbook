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
  body: string;
};

export type CommentType = {
  postId: string | undefined;
  id: string;
  username: string;
  email: string;
  body: string;
};

export type AddCommentType = {
  submitHandler: (data: CommentType) => void;
};

export type RulesType = {
  required?: { value: boolean; message?: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};
