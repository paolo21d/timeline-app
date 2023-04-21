package pl.app.timeline.api.model.excpetion;

import javax.persistence.EntityNotFoundException;

public class UserEntityNotFoundException extends EntityNotFoundException {
    public UserEntityNotFoundException(String message) {
        super(message);
    }

    public static UserEntityNotFoundException notFoundLogin(String login) {
        return new UserEntityNotFoundException("Not found user with login " + login);
    }

    public static UserEntityNotFoundException notFoundId(Long userId) {
        return new UserEntityNotFoundException(("Not found user with id=" + userId));
    }
}
