import { BaseChartData } from "../commonInterface";
import { MiniCardData } from "./commonApiInterface";
import { CreditAccount } from "../entityInterface/creditAccountInterface";
import { CreditTransaction } from "../entityInterface/creditTransactionInterface";
import { CreditTransactionSource, CreditTransactionStatus, CreditTransactionType } from "../enums";

// 
export interface FetchCreditAccountDetailsRequest {
    startDate: Date;
    endDate: Date;
}
export interface MainChartData extends BaseChartData {
    totalCredits: number;
    spentCredits: number;
    balanceCredits: number;
}
export type FetchCreditAccountDetailsResponse = Pick<CreditAccount, "isActive" > & {
    totalCredits: MiniCardData;
    spentCredits: MiniCardData;
    balanceCredits: MiniCardData
    chartData: MainChartData[];
}

//
export type FetchCreditTransactionsResponse = Pick<CreditTransaction, "_id" | "status" | "type" | "source" | "credits" | "balanceAfter">;
export type FetchCreditTransactionsQueryParams = {
    startDate: string;
    endDate: string;
    status?: CreditTransactionStatus;
    type?: CreditTransactionType;
    source?: CreditTransactionSource;
}