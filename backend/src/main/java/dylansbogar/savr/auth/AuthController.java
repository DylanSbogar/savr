package dylansbogar.savr.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import dylansbogar.savr.api.AuthApi;
import dylansbogar.savr.api.model.Login200Response;
import dylansbogar.savr.api.model.LoginRequest;

@RestController
public class AuthController implements AuthApi {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public ResponseEntity<Login200Response> register(LoginRequest request) {
        String token = authService.register(request.getEmail(), request.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Login200Response().accessToken(token));
    }

    @Override
    public ResponseEntity<Login200Response> login(LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new Login200Response().accessToken(token));
    }
}
