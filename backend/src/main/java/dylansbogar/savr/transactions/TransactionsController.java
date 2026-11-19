package dylansbogar.savr.transactions;

import dylansbogar.savr.api.TransactionsApi;
import dylansbogar.savr.api.model.TransactionDetail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
public class TransactionsController implements TransactionsApi {
    private final TransactionsRepository transactionsRepository;

    public TransactionsController(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
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
            .amount("100.10")
        .build();
        System.out.println("Fetching...");
        return ResponseEntity.ok(dummyTransaction);
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(UUID transactionId) {
        return ResponseEntity.noContent().build();
    }
}
