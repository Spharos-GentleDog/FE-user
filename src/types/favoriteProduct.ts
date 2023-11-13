// todo: 찜하기는 개별 상품 전체에 대한 찜하기가 되어야한다. 그러나 현재 productId는 옵션이 선택된 개별 상품이다. 따라서 이후에 찜하기 부분을 수정해야 된다
export interface FavoriteProductType {
  procuctId?: number;
  isFavorite?: boolean;
}
