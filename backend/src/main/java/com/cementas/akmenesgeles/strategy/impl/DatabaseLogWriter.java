package com.cementas.akmenesgeles.strategy.impl;

import com.cementas.akmenesgeles.model.LogEntry;
import com.cementas.akmenesgeles.repository.LogEntryRepository;
import com.cementas.akmenesgeles.strategy.LogWriter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DatabaseLogWriter implements LogWriter {

    private final LogEntryRepository logEntryRepository;

    public DatabaseLogWriter(LogEntryRepository logEntryRepository) {
        this.logEntryRepository = logEntryRepository;
    }

    @Override
    public void writeLog(String logMessage) {
        LogEntry logEntry = new LogEntry();
        logEntry.setMessage(logMessage);
        logEntry.setTimeStamp(LocalDateTime.now());
        logEntryRepository.save(logEntry);
    }
}