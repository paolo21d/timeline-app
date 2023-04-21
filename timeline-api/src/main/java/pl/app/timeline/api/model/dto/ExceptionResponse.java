package pl.app.timeline.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ExceptionResponse {
    private String message;
    private final Instant dateTime = Instant.now();
}
