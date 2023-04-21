package pl.app.timeline.api.model.excpetion;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String userLogin) {
        super("User with login " + userLogin + " already exists");
    }
}
