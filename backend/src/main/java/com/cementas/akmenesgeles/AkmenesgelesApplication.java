package com.cementas.akmenesgeles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AkmenesgelesApplication {

	public static void main(String[] args) {
		SpringApplication.run(AkmenesgelesApplication.class, args);
	}

}
