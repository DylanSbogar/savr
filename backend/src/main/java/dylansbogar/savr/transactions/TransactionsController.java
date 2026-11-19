package dylansbogar.savr.transactions;

import dylansbogar.savr.api.TransactionsApi;
import dylansbogar.savr.api.model.TransactionCreateRequest;
import dylansbogar.savr.api.model.TransactionDetail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
public class TransactionsController implements TransactionsApi {
    private final TransactionsRepository transactionsRepository;

    public TransactionsController(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    // Create
    //
    // Read
    //
    // Update
    //
    // Delete

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
    public ResponseEntity<TransactionDetail> getTransaction(UUID transactionId) {
        Optional<Transaction> transaction = transactionsRepository.findById(transactionId);

        if (transaction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }


        TransactionDetail dummyTransaction = TransactionDetail.builder()
            .id(transactionId)
            .name("Example transaction")
            .dateTime(OffsetDateTime.now())
            .amount(100.10)
        .build();
        System.out.println("Fetching...");
        return ResponseEntity.ok(dummyTransaction);
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
