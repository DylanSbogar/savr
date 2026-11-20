package dylansbogar.savr.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import dylansbogar.savr.config.TokenService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository users;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokens;

    public String register(String email, String password) {
        String normalized = email.trim().toLowerCase();
        if (users.existsByEmail(normalized)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }
        User user = users.save(User.builder()
                .email(normalized)
                .passwordHash(passwordEncoder.encode(password))
                .build());
        return tokens.generate(user);
    }

    public String login(String email, String password) {
        return users.findByEmail(email.trim().toLowerCase())
                .filter(u -> passwordEncoder.matches(password, u.getPasswordHash()))
                .map(tokens::generate)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    }
}
