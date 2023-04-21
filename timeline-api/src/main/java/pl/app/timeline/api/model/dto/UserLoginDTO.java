package pl.app.timeline.api.model.dto;

import javax.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank String login,
        @NotBlank String password
) {
}
