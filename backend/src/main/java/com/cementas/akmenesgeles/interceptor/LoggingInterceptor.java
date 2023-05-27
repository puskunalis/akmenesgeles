package com.cementas.akmenesgeles.interceptor;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.repository.LogEntryRepository;
import com.cementas.akmenesgeles.strategy.impl.DatabaseLogWriter;
import com.cementas.akmenesgeles.strategy.impl.FileLogWriter;
import com.cementas.akmenesgeles.strategy.LogWriter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingInterceptor {

    private final LogEntryRepository logEntryRepository;
    private final HttpServletRequest request;
    private final JwtConfig jwtConfig;

    public LoggingInterceptor(LogEntryRepository logEntryRepository,
                              HttpServletRequest httpServletRequest,
                              JwtConfig jwtConfig)
    {
        this.logEntryRepository = logEntryRepository;
        this.request = httpServletRequest;
        this.jwtConfig = jwtConfig;
    }

    @Value("${logger.path}")
    private String filePath;

    @Value("${method.interceptor.logger.enabled}")
    private Boolean enabled;

    @Value("${file.writer.strategy}")
    private String strategy;

    @Before("execution(* com.cementas.akmenesgeles.service.*.*(..))")
    public void logMethodInvocation(JoinPoint joinPoint) {
        if(Boolean.TRUE.equals(enabled)) {
            String methodName = joinPoint.getSignature().toShortString();
            String className = joinPoint.getTarget().getClass().getName();
            String username = extractUsernameFromToken();
            String role = extractRoleFromToken();

            String logMessage = String.format("Method '%s' in class '%s' invoked by %s with role %s",
                    methodName, className, username, role);

            LogWriter logWriter;
            if(strategy.equals("TO_DATABASE")){
                logWriter = new DatabaseLogWriter(logEntryRepository);
            }
            else {
                logWriter = new FileLogWriter(filePath);
            }
            logWriter.writeLog(logMessage);
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
