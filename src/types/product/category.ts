export interface ParentCategoryType {
    categoryId: number;
    categoryName: string;
}

export interface ChildCategory {
    categoryId: number;
    categoryName: string;
    categoryProductCount: number;
}