export interface productRes {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISelectedProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

export interface addProductReq {
  name: string;
  description: string | null;
  price: number;
}

export interface updateProductReq {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
}
