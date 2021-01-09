-- INSERT INTO users (username, email, password)
-- VALUES ('mario', 'mario@ymail.com', '123');
-- INSERT INTO users (username, email, password)
-- VALUES ('luigi', 'luigi@ymail.com', '123');
-- INSERT INTO users (username, email, password)
-- VALUES ('toad', 'toad@ymail.com', '123');
-- INSERT INTO users (username, email, password)
-- VALUES ('yoshi', 'yoshi@ymail.com', '123');
-- INSERT INTO users (username, email, password)
-- VALUES ('bowser', 'bowser@ymail.com', '123');


-- INSERT INTO quizzes (creator_id, title, description, url, is_private, deleted_at)
-- VALUES (1, 'Sports', 'Gummi bears dessert carrot cake biscuit pastry. ', 'updated url', false, Null);
-- INSERT INTO quizzes (creator_id, title, description, url, is_private, deleted_at)
-- VALUES (2, 'Food and drink', 'Dessert donut chocolate toffee pie gingerbread carrot cake dragée', 'updated url', false, Null);
-- INSERT INTO quizzes (creator_id, title, description, url, is_private, deleted_at)
-- VALUES (2, 'TV', 'Sweet roll sugar plum sweet roll cupcake bear claw.', 'updated url', true, Null);
-- INSERT INTO quizzes (creator_id, title, description, url, is_private, deleted_at)
-- VALUES (3, 'Music', 'Topping sesame snaps pudding candy canes brownie. ', 'updated url', true, Null);


-- INSERT INTO questions (quiz_id, question)
-- VALUES (1, 'What are the five colours of the Olympic rings?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (1, 'In tennis, what piece of fruit is found at the top of the men’s Wimbledon trophy?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (2, 'Which country is the origin of the cocktail Mojito?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (2, 'Which nuts are used in marzipan?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (3, 'What is the capital of Westeros in Game of Thrones?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (4, 'Who is the only musician ever to have been awarded the Nobel prize for literature?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (4, 'Which Beatles song was banned from the BBC for its lyrics?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES (2, 'What is Japanese sake made from?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(2, 'Which vitamin is the only one that you will not find in an egg?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(2, 'Tomatoes originated from which continent?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(2, 'Which country exports the most food?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(1, 'In 2015, which NBA player broke the record for most points scored in a quarter?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(1, 'Which NFL player has won the most playoff games in history?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(3, 'Who has selective mutism in The Big Bang Theory?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(3, 'In the show "Breaking Bad", where does Walter White hide his money in his home?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(3, 'Sergeant Nicholas Brody was a character on which of the following series?');
-- INSERT INTO questions (quiz_id, question)
-- VALUES(3, 'The popular 1990’s television series "Twin Peaks" took place in which state?');



INSERT INTO answers (question_id, answer, is_correct)
VALUES (1, 'Blue, yellow, black, green and red', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (1, 'Yellow, green, red, blue and orange', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (1, 'White, blue, green, red and orange', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (1, 'Blue, purple, black, green and red', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (2, 'Pineapple', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (2, 'Apple', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (2, 'Orange', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (2, 'Melon', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (3, 'Cuba', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (3, 'Mexico', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (3, 'Chile', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (4, 'Almonds', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (4, 'Hazelnuts', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (4, 'Cashews', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (5, 'King’s Landing', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (5, 'Winterfell', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (5, 'Casterly Rock', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (5, 'Dragonstone', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (6, 'Bob Dylan', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (6, 'Elvis Presley', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (6, 'Paul McCartney', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (6, 'Elton John', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (7, 'I am the Walrus', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (7, 'Penny Lane', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (7, 'Come together', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (7, 'Something', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (8, 'Rice', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (8, 'Wheat', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (8, 'Corn', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (9, 'Vitamin C', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (9, 'Vitamin A', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (9, 'Vitamin D', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (9, 'Vitamin K', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (10, 'South America', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (10, 'Europe', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (10, 'Asia', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (10, 'Africa', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (11, 'United States', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (11, 'China', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (11, 'India', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (12, 'Klay Thompson', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (12, 'Kevin Durant', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (12, 'Kevin Love', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (12, 'Carmelo Anthony', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (13, 'Tom Brady', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (13, 'Joe Montana', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (13, 'Drew Brees', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (13, 'John Elway', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (14, 'Raj', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (14, 'Leonard', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (14, 'Sheldon', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (14, 'Howard', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (15, 'Heating duct', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (15, 'Closet', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (15, 'Fridge', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (15, 'Car seat', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (16, 'Homeland', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (16, 'Prison Break', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (16, 'The Punisher', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (16, 'Band of Brothers', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (17, 'Washington', true);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (17, 'Pennsylvania', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (17, 'Michigan', false);
INSERT INTO answers (question_id, answer, is_correct)
VALUES (17, 'New York', false);



INSERT INTO results (user_id, result)
VALUES (1, 70);
INSERT INTO results (user_id, result)
VALUES (2, 80);
INSERT INTO results (user_id, result)
VALUES (3, 50);
