package com.cementas.akmenesgeles.strategy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;

@Component
public class FileLogWriter implements LogWriter {

    private final String filePath;

    public FileLogWriter(@Value("${logger.path}") String filePath) {
        this.filePath = filePath;
    }

    @Override
    public void writeLog(String logMessage) {
        try (FileWriter fileWriter = new FileWriter(filePath, true)) {
            fileWriter.write(logMessage + System.lineSeparator());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}