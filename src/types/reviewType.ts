// 후기 타입
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

// 후기 댓글 타입
export interface ReviewCommentType {
  reviewCommentId: number;
  reviewId: number;
  writerId: number;
  createdAt: Date;
  content: string;
}

// 후기 수
export interface ReviewCountType {
  reviewCount: number;
}