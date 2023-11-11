export interface ReviewType {
  reviewId: number;
  productId: number;
  userId: number;
  dogId: number;
  productDetailId: number;
  createdAt: Date;
  rate: number;
  reviewImgUrl: string[];
  content: string;
}

export interface ReviewCommentType {
  reviewCommentId: number;
  reviewId: number;
  writerId: number;
  createdAt: Date;
  content: string;
}

export interface ReviewCountType {
  reviewCount: number;
}