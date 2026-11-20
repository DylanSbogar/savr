package dylansbogar.savr.transactions;

import dylansbogar.savr.api.TransactionsApi;
import dylansbogar.savr.api.model.TransactionCreateRequest;
import dylansbogar.savr.api.model.TransactionDetail;
import dylansbogar.savr.api.model.TransactionSummary;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class TransactionsController implements TransactionsApi {
    private final TransactionsRepository transactionsRepository;
    private final TransactionsMapper transactionsMapper;

    public TransactionsController(TransactionsRepository transactionsRepository, TransactionsMapper transactionsMapper) {
        this.transactionsRepository = transactionsRepository;
        this.transactionsMapper = transactionsMapper;
    }

    @Override
    public ResponseEntity<UUID> createTransaction(TransactionCreateRequest request) {
        Transaction transaction = Transaction.builder()
            .name(request.getName())
            .amount(request.getAmount())
            .dateTime(request.getDateTime())
            .build();

        UUID test = transactionsRepository.save(transaction).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(test)
                .toUri();

        return ResponseEntity.created(location).body(test);
    }

    @Override
    public ResponseEntity<List<TransactionSummary>> getTransactions() {
        List<Transaction> transactions = transactionsRepository.findAll();

        return ResponseEntity.ok(transactionsMapper.toTransactionSummaries(transactions));
    }

    @Override
    public ResponseEntity<TransactionDetail> getTransaction(UUID transactionId) {
        Optional<Transaction> transaction = transactionsRepository.findById(transactionId);

        if (transaction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        TransactionDetail transactionDetail = transactionsMapper.toTransactionDetail(transaction.get());
        return ResponseEntity.ok(transactionDetail);
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(UUID transactionId) {
        Optional<Transaction> transaction = transactionsRepository.findById(transactionId);

        if (transaction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        transactionsRepository.deleteById(transactionId);

        return ResponseEntity.noContent().build();
    }
}
