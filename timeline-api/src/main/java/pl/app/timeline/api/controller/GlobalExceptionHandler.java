package pl.app.timeline.api.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.app.timeline.api.model.dto.ExceptionResponse;
import pl.app.timeline.api.model.excpetion.EventTypeAlreadyExistsException;
import pl.app.timeline.api.model.excpetion.EventTypeDeleteException;
import pl.app.timeline.api.model.excpetion.InvalidRequestException;
import pl.app.timeline.api.model.excpetion.UserAlreadyExistsException;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleExceptions(EntityNotFoundException exception, WebRequest webRequest) {
        log.error("Error", exception);
        ExceptionResponse response = new ExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            UserAlreadyExistsException.class,
            EventTypeAlreadyExistsException.class,
            EventTypeDeleteException.class,
            InvalidRequestException.class
    })
    public ResponseEntity<Object> handleExceptions(Exception exception, WebRequest webRequest) {
        log.error("Error", exception);
        ExceptionResponse response = new ExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        Map<String, List<String>> body = new HashMap<>();

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .filter(Objects::nonNull)
                .toList();

        body.put("errors", errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}
