export interface ParentCategoryType {
    parentCategoryId: number;
    parentCategoryName: string;
}

export interface ChildCategory {
    isSuccess: boolean;
    result: ChildCategoryType[];
}

export interface ChildCategoryType {
    childCategoryId: number;
    childCategoryName: string;
}

export interface ChildCategoryWithProductCount {
    childCategoryId: number;
    childCategoryName: string;
    productCount: number;

}