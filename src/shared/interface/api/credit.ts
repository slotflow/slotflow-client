import { CreditAccount } from "../entityInterface/creditAccountInterface";
import { CreditTransaction } from "../entityInterface/creditTransactionInterface";
import { CreditTransactionSource, CreditTransactionStatus, CreditTransactionType } from "../enums";

export type FetchCreditAccountDetailsResponse = Pick<CreditAccount, "isActive" | "balance" > & {
    totalCredits: number;
    spentCredits: number
    chartData: Array<{
      month: string;
      credits: number;
      date: string  
    }>
}

export type FetchCreditTransactionsResponse = Pick<CreditTransaction, "_id" | "status" | "type" | "source" | "credits" | "balanceAfter">;

export type FetchCreditTransactionsQueryParams = {
    startDate: string;
    endDate: string;
    status?: CreditTransactionStatus;
    type?: CreditTransactionType;
    source?: CreditTransactionSource;
}