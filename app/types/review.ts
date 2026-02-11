export interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user_id: number;
    product_id: number;
}