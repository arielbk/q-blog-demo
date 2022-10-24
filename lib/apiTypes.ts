// response types from JSON placeholder

export type PostRes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type UserRes = {
  id: number;
  name: string;
  username: string;
  address: Address;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type CommentRes = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
