package pl.app.timeline.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.app.timeline.api.model.dto.RegisterUserDTO;
import pl.app.timeline.api.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Long registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        return userService.registerUser(registerUserDTO.userName(), registerUserDTO.password());
    }
}
