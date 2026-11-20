package dylansbogar.savr.transactions;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;

import dylansbogar.savr.api.model.TransactionDetail;
import dylansbogar.savr.api.model.TransactionSummary;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface TransactionsMapper {
    TransactionDetail toTransactionDetail(Transaction transaction);
    // Transaction toTransaction(TransactionDetail transactionDetail);

    TransactionSummary toTransactionSummary(Transaction transaction);
    List<TransactionSummary> toTransactionSummaries(List<Transaction> transactions);
}
