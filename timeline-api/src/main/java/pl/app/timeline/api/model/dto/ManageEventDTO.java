package pl.app.timeline.api.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public record ManageEventDTO(
        @NotBlank(message = "name is required") @Size(min = 6, message = "name min length is 6") String name,
        @NotNull(message = "eventTypeId is required") Long eventTypeId,
        @NotNull(message = "startDate is required") LocalDate startDate,
        @NotNull(message = "endDate is required") LocalDate endDate,
        @NotBlank(message = "shortDescription is required") @Size(min = 6, message = "shortDescription min length is 6") String shortDescription,
        @NotBlank(message = "longDescription is required") @Size(min = 6, message = "longDescription min length is 6") String longDescription,
        String imageURL
) {
}
