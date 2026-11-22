package dylansbogar.savr.transactions;

import dylansbogar.savr.api.TransactionsApi;
import dylansbogar.savr.api.model.TransactionCreateRequest;
import dylansbogar.savr.api.model.TransactionDetail;
import dylansbogar.savr.api.model.TransactionStats;
import dylansbogar.savr.api.model.TransactionSummary;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
public class TransactionsController implements TransactionsApi {
    private final TransactionsMapper transactionsMapper;
    private final TransactionsService transactionsService;

    public TransactionsController(TransactionsMapper transactionsMapper, TransactionsService transactionsService) {
        this.transactionsMapper = transactionsMapper;
        this.transactionsService = transactionsService;
    }

    @Override
    public ResponseEntity<UUID> createTransaction(TransactionCreateRequest request) {
        UUID transactionId = transactionsService.createTransaction(transactionsMapper.toTransaction(request));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(transactionId)
                .toUri();

        return ResponseEntity.created(location).body(transactionId);
    }

    @Override
    public ResponseEntity<List<TransactionSummary>> getTransactions() {
        List<Transaction> transactions = transactionsService.getTransactions();
        return ResponseEntity.ok(transactionsMapper.toTransactionSummaries(transactions));
    }

    @Override
    public ResponseEntity<TransactionDetail> getTransaction(UUID transactionId) {
        Transaction transaction = transactionsService.getTransaction(transactionId);
        return ResponseEntity.ok(transactionsMapper.toTransactionDetail(transaction));
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(UUID transactionId) {
        transactionsService.deleteTransaction(transactionId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<TransactionStats> getTransactionStats(OffsetDateTime from, OffsetDateTime to) {
        return null;
    }
}
