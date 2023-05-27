package com.cementas.akmenesgeles.strategy;

import com.cementas.akmenesgeles.model.LogEntry;
import com.cementas.akmenesgeles.repository.LogEntryRepository;
import org.springframework.stereotype.Component;

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
        logEntryRepository.save(logEntry);
    }
}