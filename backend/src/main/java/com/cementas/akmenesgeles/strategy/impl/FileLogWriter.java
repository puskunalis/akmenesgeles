package com.cementas.akmenesgeles.strategy.impl;

import com.cementas.akmenesgeles.strategy.LogWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class FileLogWriter implements LogWriter {

    private final String filePath;

    public FileLogWriter(@Value("${logger.path}") String filePath) {
        this.filePath = filePath;
    }

    @Override
    public void writeLog(String logMessage) {
        try (FileWriter fileWriter = new FileWriter(filePath, true)) {
            logMessage = logMessage + " at " + LocalDateTime.now();
            fileWriter.write(logMessage + System.lineSeparator());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}