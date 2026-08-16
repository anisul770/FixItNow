export interface newReviewPayload {
    rating : number;
    comment? : string;
}

export interface updateReviewPayload {
    rating? : number;
    comment? : string;
}
