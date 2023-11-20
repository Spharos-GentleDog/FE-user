export interface ParentCategoryType {
    parentCategoryId: number;
    parentCategoryName: string;
}

export interface ChildCategory {
    categoryId: number;
    categoryName: string;
    categoryProductCount: number;
}