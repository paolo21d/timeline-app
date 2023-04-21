package pl.app.timeline.api.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record RegisterUserDTO(
        @NotBlank(message = "userName is required") @Size(min = 6, message = "userName min length is 6") String userName,
        @NotBlank(message = "password is required") @Size(min = 6, message = "password min length is 6") String password
) {
}
