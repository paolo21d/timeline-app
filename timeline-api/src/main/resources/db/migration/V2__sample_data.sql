insert into event_types (name,
                         colour)
values ('event-type-1', 'red'),
       ('event-type-2', 'blue'),
       ('event-type-3', 'green');

insert into events (name, type_id, start_date, end_date, short_description, long_description, image_url,
                    create_date_time)
values ('event-1', (select type_id from event_types where name = 'event-type-1'), '2022-10-10', '2022-10-10',
        'short-description-1', 'long-description-1', null, '2022-10-20 21:23:56.568716'),
       ('event-2', (select type_id from event_types where name = 'event-type-1'), '2022-10-11', '2022-10-11',
        'short-description-2', 'long-description-2', null, '2022-10-20 22:23:56.568716'),
       ('event-3', (select type_id from event_types where name = 'event-type-2'), '2022-10-15', '2022-10-18',
        'short-description-3', 'long-description-3', 'image_url', '2022-10-21 15:23:56.568716');


insert into users (login, password, create_date_time)
values ('user-1', '$2a$10$M3NUThlGapYj4LIH8lYhl.sjhNsnpXCwOSgNGBdskWlS2nQuwlIwe', '2022-10-21 20:22:22.639370'),
       ('user-2', '$2a$10$6kXw4QiuZTfLqikNqMv.G.51pLeZmke.lOiIrI512lIsXrcrv92xu', '2022-10-21 20:27:22.639370');