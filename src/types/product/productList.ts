export interface ProductList {
    productId: number;
    productName: string;
    productPrice: number;
    brandName: string;
    discounts: discounts;
    totalFavorite: number
    salesStatus: string;
    mainImageName: string;
    sizes: string[];
    colors: colorList[];
    allOfSizes: string[];
    mainImageUrl: string;
}

export interface colorList {
    colorName: string;
    colorCode: string;
}

export interface discounts {
    productDetailId: number;
    discountRate: number;
    discountType: number;
}