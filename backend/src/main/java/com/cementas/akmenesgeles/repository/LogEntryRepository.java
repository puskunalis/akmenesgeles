package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
}
