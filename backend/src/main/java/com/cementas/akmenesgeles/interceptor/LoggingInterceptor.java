package com.cementas.akmenesgeles.interceptor;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.model.Interceptor;
import com.cementas.akmenesgeles.repository.InterceptorRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Aspect
public class LoggingInterceptor {

    private final InterceptorRepository interceptorRepository;
    private final HttpServletRequest request;
    private final JwtConfig jwtConfig;
    public LoggingInterceptor(InterceptorRepository interceptorRepository, HttpServletRequest httpServletRequest, JwtConfig jwtConfig) {
        this.interceptorRepository = interceptorRepository;
        this.request = httpServletRequest;
        this.jwtConfig = jwtConfig;
    }

    private static final Integer ID = 1;

    @Value("${logger.path}")
    private String filePath;

    @Before("execution(* com.cementas.akmenesgeles.service.*.*(..))")
    public void logMethodInvocation(JoinPoint joinPoint) {
        if(Boolean.TRUE.equals(isEnabled())) {
            String methodName = joinPoint.getSignature().toShortString();
            String className = joinPoint.getTarget().getClass().getName();
            String username = extractUsernameFromToken();
            String role = extractRoleFromToken();
            LocalDateTime timestamp = LocalDateTime.now();

            String logMessage = String.format("Method '%s' in class '%s' at %s invoked by %s with role %s",
                    methodName, className, timestamp, username, role);

            writeLogToFile(logMessage);
        }
    }

    public Boolean isEnabled() {
        Optional<Interceptor> interceptor = interceptorRepository.findById(ID);
        return interceptor.isPresent() && (Boolean.TRUE.equals(interceptor.get().getEnabled()));
    }

    private void writeLogToFile(String logMessage) {
        try (FileWriter fileWriter = new FileWriter(filePath, true)) {
            fileWriter.write(logMessage + System.lineSeparator());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String extractUsernameFromToken() {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            Claims claims = Jwts.parserBuilder().setSigningKey(jwtConfig.getSecret()).build().parseClaimsJws(jwtToken).getBody();
            return claims.get("username", String.class);
        }
        return "Guest";
    }

    private String extractRoleFromToken() {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            Claims claims = Jwts.parserBuilder().setSigningKey(jwtConfig.getSecret()).build().parseClaimsJws(jwtToken).getBody();
            return claims.get("role", String.class);
        }
        return "user";
    }
}
