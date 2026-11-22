package dylansbogar.savr.transactions;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;

import dylansbogar.savr.api.model.TransactionCreateRequest;
import dylansbogar.savr.api.model.TransactionDetail;
import dylansbogar.savr.api.model.TransactionSummary;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface TransactionsMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    Transaction toTransaction(TransactionCreateRequest transactionCreateRequest);

    TransactionDetail toTransactionDetail(Transaction transaction);

    TransactionSummary toTransactionSummary(Transaction transaction);
    List<TransactionSummary> toTransactionSummaries(List<Transaction> transactions);
}
