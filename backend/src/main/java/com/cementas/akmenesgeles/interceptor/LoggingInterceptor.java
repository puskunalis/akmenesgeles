package com.cementas.akmenesgeles.interceptor;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.model.Interceptor;
import com.cementas.akmenesgeles.model.Strategy;
import com.cementas.akmenesgeles.model.StrategyType;
import com.cementas.akmenesgeles.repository.InterceptorRepository;
import com.cementas.akmenesgeles.repository.LogEntryRepository;
import com.cementas.akmenesgeles.repository.StrategyRepository;
import com.cementas.akmenesgeles.strategy.DatabaseLogWriter;
import com.cementas.akmenesgeles.strategy.FileLogWriter;
import com.cementas.akmenesgeles.strategy.LogWriter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Aspect
public class LoggingInterceptor {

    private final InterceptorRepository interceptorRepository;
    private final LogEntryRepository logEntryRepository;
    private final StrategyRepository strategyRepository;
    private final HttpServletRequest request;
    private final JwtConfig jwtConfig;

    public LoggingInterceptor(InterceptorRepository interceptorRepository,
                              LogEntryRepository logEntryRepository,
                              StrategyRepository strategyRepository,
                              HttpServletRequest httpServletRequest,
                              JwtConfig jwtConfig)
    {
        this.interceptorRepository = interceptorRepository;
        this.logEntryRepository = logEntryRepository;
        this.strategyRepository = strategyRepository;
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

            if(getStrategy() != null && getStrategy().equals(StrategyType.TO_DATABASE)){
                LogWriter logWriter = new DatabaseLogWriter(logEntryRepository);
                logWriter.writeLog(logMessage);
            }
            else {
                LogWriter logWriter = new FileLogWriter(filePath);
                logWriter.writeLog(logMessage);
            }
        }
    }

    private Boolean isEnabled() {
        Optional<Interceptor> interceptor = interceptorRepository.findById(ID);
        return interceptor.isPresent() && (Boolean.TRUE.equals(interceptor.get().getEnabled()));
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

    private StrategyType getStrategy() {
        Optional<Strategy> strategy = strategyRepository.findById(1);
        return strategy.map(Strategy::getStrategyType).orElse(null);
    }
}
