# Swipe Gallery

## build
https://github.com/expo/eas-cli/issues/1300


create table if not exists images(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT, date TEXT, uri TEXT, desc TEXT);
insert into images (name, author, date, desc, uri) values ('test1','MrS-E', '04.10.2023', 'test test', 'https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg');
insert into images (name, author, date, desc, uri) values ('Bau,','Pixabay', '04.10.2023', '', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg');
insert into images (name, author, date, desc, uri) values ('Buch','Unsplah', '04.10.2023', '', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80');
insert into images (name, author, date, desc, uri) values ('Galaxie','Freepik', '04.10.2023', '', 'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg');
insert into images (name, author, date, desc, uri) values ('Blume','Shutterstock', '04.10.2023', '', 'https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg');
insert into images (name, author, date, desc, uri) values ('Feder','Pexels', '04.10.2023', '', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg');
