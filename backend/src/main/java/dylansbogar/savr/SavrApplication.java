package dylansbogar.savr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SavrApplication {

	public static void main(String[] args) {
		SpringApplication.run(SavrApplication.class, args);
	}

}
