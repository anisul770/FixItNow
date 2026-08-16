export interface newServicePayload {
    title : string;
    description: string;
    price: number;
    duration: number;
    categoryId : string;
}

export interface IServiceQuery {
    title ?: string;
    categoryId ?: string;
    location ?:string;
    price ?: number;
    rating ?: number;
    limit ?: number;
    page ?: number;
    sortBy ?: string;
    sortOrder ?: string;
    searchTerm ?: string;
}