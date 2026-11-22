package dylansbogar.savr.transactions;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import dylansbogar.savr.auth.CurrentUser;

@Service
public class TransactionsService {
    private final CurrentUser currentUser;
    private final TransactionsRepository transactionsRepository;

    public TransactionsService(CurrentUser currentUser, TransactionsRepository transactionsRepository) {
        this.currentUser = currentUser;
        this.transactionsRepository = transactionsRepository;
    }

    public Transaction findById(UUID transactionId) {
        return transactionsRepository.findByIdAndUserId(transactionId, currentUser.id())
            .orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404)));
    }

    public UUID createTransaction(Transaction transaction) {
        transaction.setUserId(currentUser.id());
        return transactionsRepository.save(transaction).getId();
    }

    @Transactional(readOnly = true)
    public List<Transaction> getTransactions() {
        return transactionsRepository.findByUserId(currentUser.id());
    }

    @Transactional(readOnly = true)
    public Transaction getTransaction(UUID transactionId) {
        return findById(transactionId);
    }

    // @Transactional
    // public void updateTransaction() {}

    @Transactional
    public void deleteTransaction(UUID transactionId) {
        int deleted = transactionsRepository.deleteByIdAndUserId(transactionId, currentUser.id());
        if (deleted == 0) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(404));
        }
    }
}
