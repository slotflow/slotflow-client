import { FaqFields } from "../commonInterface";

// get faqs params
export interface GetFaqsParams {
    limit?: number;
    skip?: number;
    category?: string;
}

// get faqs response
export interface GetFaqsResponse {
    faqs: FaqFields[];
    total: number;
}