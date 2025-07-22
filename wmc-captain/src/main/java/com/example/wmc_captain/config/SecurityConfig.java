package com.example.wmc_captain.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 1) Allow anyone to call your login endpoint:
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        // 2) (Optionally) allow your registration or public GETs
                        .requestMatchers(HttpMethod.GET, "/api/public/**").permitAll()
                        // 3) Everything else requires authentication
                        .anyRequest().authenticated()
                )
                // turn off the default login form (you don’t have one)
                .formLogin(form -> form.disable())
                // remove HTTP‑Basic if you don’t want it
                .httpBasic(withDefaults())
        ;
        return http.build();
    }
}
